# Repository
A repository encapsulates logic partaining to querying and retrieving data, and in some cases, logic to retrieve certain summary information. Repositories are often used as an abstraction between the application logic and data persistance capabilities. Repositories are defined within the domain layer and implemented in the infrastructure layer. There is usually a 1-to-1 relationship between Aggregates and Repositories, where for every aggregate in the domain, there is one corresponding repository.

## Defining a Repository
To define a repository, we override the `Repository` class. 
```ts
import { Repository } from '@perivel/fragment';

export abstract class UserRepository extends Repository {

    constructor() {
        super();
    }
}
```
Since repositories are only defined in the domain layer, we will usually declare our repositories as abstract classes, and implement them later in the infrastructure layer (i.e. in the framewoerk we decide to use). Every repository has three methods that must be overriden. The `remove()` method removes the specified aggregate from the repository. The `save()` method updates (or creates) the specified aggregate to the repository. And the `size()` method gets the number of objects in the repository.
```ts
import { Repository } from '@perivel/fragment';

export abstract class UserRepository extends Repository {

    constructor() {
        super();
    }

    public abstract remove(user: User): Promise<void>;

    public abstract save(user: User): Promise<void>;

    public abstract size(): Promise<number>;
}
```
Since we are creating this repository to specifically handle User aggregates, we specify our method arguments to accept aggregate instances of the type User, where User is an aggregate. We cover aggregates in more deltail in the Aggregates section.

In addition to our basic persistence methods, repositories also contain functionalities to retrieve data. To add these functionalities, we just define them in our abstract class.
```ts
import { Repository } from '@perivel/fragment';

export abstract class UserRepository extends Repository {

    constructor() {
        super();
    }

    // custom query methods
    public abstract getById(id: UserId): Promise<User>;

    // These are the required methods.

    public abstract remove(user: User): Promise<void>;

    public abstract save(user: User): Promise<void>;

    public abstract size(): Promise<number>;
}
```
Here, we define a single query method, which gets a user by its ID. Like with the persistence methods, we only define our query method and leave its implementation to the infrastructure layer.

## Identity Generation
In some designs, it makes sence the repository be tasked with assinging identity
to domain objects. For this functionality, use `IdentityGeneratingRepository`.
```ts
import { IdentityGeneratingRepository } from '@perivel/fragment';

export abstract class UserRepository extends IdentityGeneratingRepository {

    constructor() {
        super();
    }

    // custom query methods
    public abstract getById(id: UserId): Promise<User>;

    // These are the required methods.

    public generateIdentity(): UserId {
        return UserId.Generate();
    }

    public abstract remove(user: User): Promise<void>;

    public abstract save(user: User): Promise<void>;

    public abstract size(): Promise<number>;
}
```
Notice here the only difference between `Repository` and `IdentityGeneratingRepository` is the `generateIdentity()` method, which we implement to assign a uique identity (a UserId in this case).