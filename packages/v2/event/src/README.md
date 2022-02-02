# Aggregate
An Aggregate is a cluster of associated objects, that can be treated as a single unit. Aggregates are created around a single entity, that maintains some boundary of consistency.

## Creating an Aggregate
To define an aggregate with the [Domeniere CLI](https://github.com/Perivel/domeniere-cli), we can run the following command in our root directory.
```
domeniere create aggregate <aggregate name> <module name>
```

To create an Aggregate manually, we extend the `Aggregate` class.
```ts
import { Aggregate } from 'domeniere';

export class Account extends Aggregate {

    constructor(user: User, version: number) {
        super(user, version);
    }
}
```
Every aggregate takes an entity and a version number as its constructor argument. The provided entity will serve as the aggregate root. In our case, our Account aggregate will take a UserEntity as its root. The version number is an optional argument that is used to keep track of changes to the aggregate. By default, it will be set to 1.0.

We are now free to create our aggregate as we see fit. Below is an example.
```ts
import { Aggregate } from 'domeniere';

export class Account extends Aggregate {

    private _verification: AccountVerification;

    constructor(user: User, verification: AccountVerification, version: number) {
        super(user, version);
        this._verification = verification;
    }

    public updateEmail(email: EmailAddress) {
        this.root().setContact(new UserContact(email, this.root().contact().phone()));
        this.commitStateChanges();
    }

    public very(code: VerificationCode): void {
        if (this._verification.code().equals(code)) {
            this._verification.complete();
            this.root().setVerificationDate(DateTime.Now());
            this.commitStateChange();
        }
        else {
            throw new Error("Verification code does not match");
        }
    }
}
```
We define two methods. The `updateEmail()` method updates the user's account email. Notice that whenever we need access to aggregate root, we reference it through the `root()` method.

The second method we define is the `verify()` method. This method demonstrates how we use aggregates to maintain consistency among our objects  and entities. Here, we check whether or not the passed in verification code matches the one we have on record. If they do match, we mark the verification as complete. But, not only that, we also update our user root entity to indicate when it was verified.

## Versioning
Versioning is a useful tool to keep track of changes to the state of your aggregates. Domeniere provides a few methods to assist in doing this.

**commitStateChanges()**
The `commitStateChanges()` method tells Domeniere your aggregate has changed its state. We saw an example of this earlier when we defined our aggregate methods.
```ts
public updateEmail(email: EmailAddress) {
        this.root().setContact(new UserContact(email, this.root().contact().phone()));
        this.commitStateChanges();
    }
```
Here, since we change our aggregate's email value, we call the `commitStateChange()` to inform Domeniere of the change that was made.

**confirmStateChanges()**
The `confirmStateChanges()` method tells Domeniere that the committed changes have been made permanent (usually persisted to storage). This method is usually called after an aggregate has been successfully persisted in a repository.

**hasUnconfirmedStateChanges()**
The `hasUnconfirmedStateChanges()` method determines if the aggregate has state changes that have not yet been confirmed.

**countUnconfirmedStateChanges()**
The `countUnconfirmedStateChanges()` method gets the number of committed changes that have not yet been confirmed.

**version()**
The `version()` method gets the committed version.