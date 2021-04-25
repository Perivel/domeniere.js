# Service
A Domain Service represents an operation on a Domain Object. Domain Services usually represent high-level operations like "create user" or "get the profile information of the user with this id". In most cases, each domain service will be responsible for ***one*** single task. In the vast majority of cases, domain services will fall into two general categories. A `Command` is used to update some state in your domain. A `Query` retrieves data from a Data source. 

## Commands
A command is an operation that updates some state in your domain. Think of a command as a write operation. A command does not return any value. Its sole purpose is to change some state in our data. `Commands` should be task-based, instead of data centric.

To define a `Command` by extending the `Command` class.
```ts
import { Command } from '@perivel/fragment`;

export class CreateUserCommand extends Command {

    constructor() {
        super();
    }
}
```
Here, we define a CreateUserCommand, which will be used to create a new user in our system. 

In many cases, domain services will require dependencies such as Factories and Repositories to help it perform its duties. In these cases, we can introduce such dependencies through the constructor. 
```ts
export class CreateUserCommand extends Command {

    private readonly userRepository: UserRepository;
    private readonly userFactory: UserFactory;

    constructor(userFactory: UserFactory, userRepo: UserRepository) {
        super();
        this.userFactory = userFactory;
        this.userRepository = userRepo;
    }
}
```
Notice here that we inject the required repository and factory, as opposed to hard coding the dependency directly. It is highly recommended to inject dpendencies through the constructor n order to keep your services as flexible and loosely coupled as possible.

The only method we need to override in our command class is the `execute()` method, which contains the instructions for carrying out the command's responsibilities. The `execute()` method has the following signiture:
```ts
public async execute(arg1, arg2, ...): Promise<void>
```
All commands are asynchronous. THe `execute()` command can have as many arguments as it needs. And, since it is a command, it does not return anything upon its successful completioon.

Let's define the `execute()` method for our CreateUserCommand class.
```ts
export class CreateUserCommand extends Command {

    private readonly userRepository: UserRepository;
    private readonly userFactory: UserFactory;

    constructor(userFactory: UserFactory, userRepo: UserRepository) {
        super();
        this.userFactory = userFactory;
        this.userRepository = userRepo;
    }

    public async execute(registration: UserRegistration): Promise<void> {
        const user = this.userFactory.createFromRegistration(registration);

        try {
            await this.userRepository.save(user);
            await this.emit(new UserCreated(user));
        }
        catch(e) {
            throw new Error();
        }
    }
}
```
Here, our execute() command is pretty straiht forward. We create a user object using our UserFactory's `createFromRegistration()` method. We then save the created user to our user repository.

## Queries
A `Query` retrieves or derrives some data from a source. Think of a `Query` as a read operation. A `Query` should not modify any kind of data. 

To define a Query, we extend the `Query` class. 
```ts
import { Query } from '@perivel/fragment`;

export class GetUserByIdQuery extends Query {

    constructor() {
        super();
    }
}
```
Similar to `Command`, we can inject dependencies throwugh the constructor.
```ts
export class GetUserByIdQuery extends Command {

    private readonly userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
        super();
        this.userRepository = userRepo;
    }
}
```
Also similar to `Command`, we override the `execute()` command. However, the signiture of `Query`'s `execute()` method is a little bit different. Here is how it looks like.
```ts
public async execute(arg1, arg2, ...): Promise<any>
```
Like `Command`, query's `execute()` method also lets you define however many arguments you need in order for the query to perform its task. Unlike `Command` however, `Query` lets you return whatever type you need to. 

Let's define the `execute()` method of our GetUserByIdQuery class.
```ts
export class CreateUserCommand extends Command {

    private readonly userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
        super();
        this.userRepository = userRepo;
    }

    public async execute(id: UserId): Promise<User> {

        try {
            return await this.userRepository.getById(id);
        }
        catch(e) {
            throw new Error();
        }
    }
}
```
Here, our `execute()` method takes an instance of UserId as its only argument, and returns a User object, which is associated with the provided ID.

## Emitting Events
You may have noticed in our `Command` example we had a line that said the following.
```ts
await this.emit(new UserCreated(user));
```
In many cases, different parts of your domain may need to respond to state changes. In order to notify your domain about a state change, services can emit events to inform interested parties about changes through the built in `emit()` method. 

To learn more about events, refer to the Events section.