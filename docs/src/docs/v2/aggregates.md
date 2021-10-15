# Aggregates
An Aggregate is a cluster of associated objects, that can be treated as a single unit. Aggregates are created around a single entity, that maintains some boundary of consistency.

## Creating an Aggregate
To define an aggregate, we can run the following command in our root directory.
```
domeniere create aggregate <module-name>/path/to/aggregate-name
```
This command will create a new aggregate in the `aggregates` subdirectory of our specified module.

> **Note**: In order to create an aggregate, you need to have created a module that will contain the aggregate. See the [Modules](./modules) section for more details.

Every aggregate takes an entity and a version number as its constructor argument. The provided entity will serve as the aggregate root. The version number is an optional argument that is used to keep track of changes to the aggregate. By default, it will be set to 1.0.

Below is an example definition for an `Account` aggregate.
```ts
import { Aggregate } from '@domeniere/aggregate';
import { User } from './../../entities/entities.well';

export class Account extends Aggregate {

    constructor(user: User, version: number) {
        super(user, version);
    }

    protected root(): User {
        return super.root() as User;
    }
}
```
All aggregates are created around a single entity, known as the **Aggregate Root**. In our example `Account` aggregate, the root is the `User` entity. By default, the `root()` method returns an instance of `Entity`. For type-safety reasons, we recommend overriding the `root()` method to return the instance of your specified entity.

## Aggregate State
On its own, our `Account` aggregate already has its own state, through the Aggregate Root. As an example, we can define functionality to update our `Account` username.
```ts
import { Aggregate } from '@domeniere/aggregate';
import { User } from './../../entities/entities.well';
import { Username } from './../../values/values.well';

export class Account extends Aggregate {

    constructor(user: User, version: number) {
        super(user, version);
    }

    protected root(): User {
        return super.root() as User;
    }

    public setUsername(newUsername: Username): void {
        this.root().setUsername(newUsername);
        this.commitStateChanges();
    }

    public username(): Username {
        return this.root.username();
    }
}
```
Notice here how we access the user properties through the root. The root is not directly accessible outside the `Aggregate`. Instead, we create methods to proxy properties of our root to the outside. This helps us control changes to our aggregate state and maintain a level of consistency.

There are times, however, when our `Aggregate` has more state to maintain than what is contained within its root. For our `Account` aggregate, we may need to maintain more information such as passwords. For this reason, Domenire also lets us define state properties for our `Aggregate`.

### Defining Aggregate State
Let's begin by definng a `password` property for our `Aggregate`.
```ts
import { Aggregate } from '@domeniere/aggregate';
import { User } from './../../entities/entities.well';
import { 
    Username,
    Password
} from './../../values/values.well';

export class Account extends Aggregate {

    private _password: Password;

    constructor(user: User, password: Password, version: number) {
        super(user, version);
        this._password = password;
    }

    protected root(): User {
        return super.root() as User;
    }

    public setUsername(newUsername: Username): void {
        this.root().setUsername(newUsername);
        this.commitStateChanges();
    }

    public username(): Username {
        return this.root.username();
    }
}
```
Here, we define a new property called `password`, which is hold the hashed password for the `Acount` aggregate. But, we are not done yet. In addition to defining our `password` property, we have to tell Domeniere that this `passwword` property is part of the `Aggregate`'s state. To do this, we annotate the property definition with the `State()` decorator.
```ts
import { Aggregate } from '@domeniere/aggregate';
import { State } from '@domeniere/common';
import { User } from './../../entities/entities.well';
import { 
    Username,
    Password
} from './../../values/values.well';

export class Account extends Aggregate {

    @State()
    private _password: Password;

    constructor(user: User, password: Password, version: number) {
        super(user, version);
        this._password = password;
    }

    protected root(): User {
        return super.root() as User;
    }

    public setUsername(newUsername: Username): void {
        this.root().setUsername(newUsername);
        this.commitStateChanges();
    }

    public username(): Username {
        return this.root.username();
    }
}
```
By annotating our `password` property with the `State()` decorator, we tell Domeniere that our `password` property is part of our `Account` aggregate's state and should be tracked. 

Now, let's define some functionalities in our `Account` aggregate for managing passwords.
```ts
import { Aggregate } from '@domeniere/aggregate';
import { State } from '@domeniere/common';
import { User } from './../../entities/entities.well';
import { 
    Username,
    Password,
    AuthenticationAttempts,
    AccountStatus,
} from './../../values/values.well';

export class Account extends Aggregate {

    @State()
    private _password: Password;

    @State()
    private _status: AccountStatus;

    @State()
    private _authenticationAttempts: AuthenticationAttempts;

    constructor(user: User, password: Password, authAttempts: AuthenticationAttempts, status: AccountStatus, version: number) {
        super(user, version);
        this._password = password;
        this._authenticationAttempts = authAttempts;
        this._status = status;
    }

    public async authenticate(suspect: PasswordInput): Promise<void>> {
        const matches = await this._password.matches(suspect);

        if (!matches) {
            this._authenticationAttempts = this._authenticationAttempts.increment();
            
            if (this._authenticationAttempts.limitReached()) {
                this._status = AccountStatus.LockedStatus();
            }

            this.commitStateChanges();
            throw new AccountAuthenticationFailedException();
        }
        else {
            this._authenticationAttempts = this._authenticationAttempts.reset();
            this._status = AccointStatus.Normal();
            this.commitStateChanges();
        }
    }

    protected root(): User {
        return super.root() as User;
    }

    public setUsername(newUsername: Username): void {
        this.root().setUsername(newUsername);
        this.commitStateChanges();
    }

    public username(): Username {
        return this.root.username();
    }
}
```
We define two additional state properties to assist us in managing password authentication. The `AccountStatus` value object contains the possible statuses an `Account` aggregate can have. THe `AuthenticationAttempts` manages the number of attempts previously made on this account, and whther or not the authentication attempt limit has been exceeded. We first determine if the password we received matches the hashed password for this account. If the password matches, then the caller can be authenticated and we reset the attempts. If the password input does not match, however, we increment the number of attempts, and if the allowed limit is exceeded, we lock the account for security purposes. This example illustrates how we can use Aggregates to enforce consistencies within state changes.

> **Note**: the above method does not represent a complete authentication solution. Rather, it represents part of one that will be used in an authentication process defined within a service such as an `AuthenticateAccountCommand`. For more information about services, see the [Services](./services) section.

Notice that in our `authenticate()` method, we also call the aggregate's `commitStateChanges()` method. This is mandetory to assist Domeniere in tracking state changes, as we will explain in the Aggregate Lifecycle. Another detail to note is that **Domeniere uses the assignment operator (`=` sign) to detect state changes**.

### The Aggregate State Lifecycle
The Aggregate State lifecycle consists of three phases: Initialization, Commitment, Verification.

In the initialization phase, the aggregate's state is first set (or initialized). This step usually takes place in the constructor of the aggregate. In the initialization phase, the initial state of the aggregate is set. 

The Commitment phase begins when a state change has taken place in the aggregate. The Commitment phase is initiated by calling the aggregate's `commitStateChanges()` method. Once a state change has been commited, the aggregate will recognize the new state as its current state and all references to the updated properties will return the new state value. However, until the the next step is completed, it is still possible to rollback or undo the commited state changes.

The Verification phase is the final phase of the Aggregate State Lifecycle. In the Verification phase, the committed state changes of an aggregate are either confirmed with the aggregate's `confirmStateChanges()` method or discarded with the `rollbackStateChanges()` method. This phase is normally executed by a `Command` that utilizes the aggregate.

> **Note**: You can learn more about Commands in the [Services](./services) section.

## Aggregate Versioning
Versioning is a useful tool to keep track of changes to the state of your aggregates. Versioning will often be used to synchronize changes across Domeniere domains. By default, Domeniere manages aggregate versions as part of the `Aggregate` state. So, aggregate versioning is not something youu need to worry about too much.

## Timestamped Aggregates
Sometimes, we want or need to attach timstamps to our aggregates that indicate when they were created, last updated, or even deleted. In these cases, we can create a `Timestamped Aggregate`, which will track these timestamps for our entiy  automatically.

### Defining Timestamped Aggregates
We can create a `Timestamped Aggregate` by using the following command in our project root.
```
domeniere create aggregate <module-name>/path/to/the/aggregate-name --timestamped
```
This will create a new directory for the aggregate in the specified module's aggregates subdirectory. This subdirectory will contain both an interface file and a class file for our aggregate.

> **Note**: In order to create an aggregate, you need to have created a module that will contain the aggregate. See the [Modules](./modules) section for more details.

The created `Timestamped Aggregate` is very similar to a regular aggregate. The only difference is our created `Timestamped Aggregate` now includes arguments for DateTimes when they were created, updated, and deleted. We can create our `Aggregate` just like we normally would. Domeniere will automatically manage our timestamps for us in the Aggregate state Lifecycle.