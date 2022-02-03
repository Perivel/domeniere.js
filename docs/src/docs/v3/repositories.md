# Repositories
A repository encapsulates logic partaining to querying and retrieving data, and in some cases, logic to retrieve certain summary information. Repositories are used as an abstraction between the application logic and data persistance capabilities. Repositories are defined within our Domeniere project as abstract classes. They are then defined by the users of our library to adopt them to the proper environment. There is usually a 1-to-1 relationship between Aggregates and Repositories, where for every aggregate there is one corresponding repository.

## Defining a Repository
To define a repository, we can run the following command in our root directory.
```
domeniere create repository <module-name>/path/to/the/repository-name
```
This will create a repository file inside the `repositories` subdirectory of the specified module.

> **Note**: In order to create a repository, you need to have created a module that will contain the repository. See the [Modules](./modules) section for more details.

Since repositories need to adopt to their environment, we declare our repositories as abstract classes. Every repository has three methods that must be overriden. The `remove()` method removes the specified aggregate from the repository. The `save()` method updates (or creates) the specified aggregate to the repository. And the `size()` method gets the number of objects in the repository.

Below is an example definition of a `AccountRepository`.
```ts
import { Repository } from '@domeniere/repository';
import { Account } from './../../aggregates/aggregates.well';

export abstract class AccountRepository extends Repository {

    constructor() {
        super();
    }

    public abstract remove(account: Account): Promise<void>;

    public abstract save(account: Account): Promise<void>;

    public abstract size(): Promise<number>;
}
```
Since we are creating this repository to specifically handle `Account` aggregates, we specify our method arguments to accept aggregate instances of the type Account, where Account is an aggregate.

> **Note**: You can learn more about Aggregates in the [Aggregates](./aggregates) section.

In addition to our basic persistence methods, repositories also contain functionalities to retrieve data. To add these functionalities, we just define them in our abstract class.
```ts
import { Repository } from '@domeniere/repository';
import { Account } from './../../aggregates/aggregates.well';
import { UserId } from './../../values/values.well';

export abstract class AccountRepository extends Repository {

    constructor() {
        super();
    }

    public abstract getById(id: UserId): Promise<Account>;

    public abstract remove(account: Account): Promise<void>;

    public abstract save(account: Account): Promise<void>;

    public abstract size(): Promise<number>;
}
```
Here, we define a single query method, which gets an `Account` by its ID. Like with the persistence methods, we only define our query method and leave its implementation to the users of our application.

## Identity Generation
In some designs, it makes sence the repository be tasked with assinging identity. For this functionality, use `Identity Generating Repository`.

We can define an Identity Generating Repository by using the following command in our project root directory.

```
domeniere create repository <module-name>/path/to/the/repository-name --generates-identity
```
This will create a repository file for our repository in the specified module's `repositories` subdirectory.

> **Note**: In order to create a repository, you need to have created a module that will contain the repository. See the [Modules](./modules) section for more details.

An Identity-Generating Repository behaves very similar to a regular repository, except for one difference. As its name implies, it has the capability to generate Ids for whatever aggregate it is responsible for.

Below is an example of our `AccountRepository` with the ability to generate `UserId` instances for our accounts.
```ts
import { Repository } from '@domeniere/repository';
import { Account } from './../../aggregates/aggregates.well';
import { UserId } from './../../values/values.well';

export abstract class AccountRepository extends Repository {

    constructor() {
        super();
    }

    public generateIdentity(): UserId {
        return UserId.Generate();
    }

    public abstract getById(id: UserId): Promise<Account>;

    public abstract remove(account: Account): Promise<void>;

    public abstract save(account: Account): Promise<void>;

    public abstract size(): Promise<number>;
}
```

Notice here the only difference between `Repository` and `IdentityGeneratingRepository` is the `generateIdentity()` method, which we implement to assign a uique identity (a UserId in this case).

## Registering Repositories
Something important that we have to do in order to ensure our repositories are available is to register them with our module. We register repositories inside our module's `createBindings()` method. 

To register our repository, we use the `bindRepository()` method, passing in our Repository Class as an argument.
```ts
this.bindRepository(AccountsRepository);
```
In the above code, we are registering an `AccountsRepository` to our module. Once this step is complete, we are now ready to use our repository in our application.

You can learn more about Module Bindings in the [Modules](./modules) section.