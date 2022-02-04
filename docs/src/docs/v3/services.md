# Services
A Domain Service represents an operation on a Domain Object. Domain Services usually represent high-level operations like "create user" or "get the profile information of the user with this id". In most cases, each domain service will be responsible for ***one*** single task. Services follow the [CQRS pattern](https://martinfowler.com/bliki/CQRS.html#:~:text=CQRS%20stands%20for%20Command%20Query,you%20use%20to%20read%20information.) A `Command` is used to update some state in your domain. A `Query` retrieves data from a Data source. 

## Commands
A command is an operation that updates some state in your application. Think of a command as a write operation. A command does not return any value. Its sole purpose is to change some state in our data. `Commands` should be task-based, instead of data centric.

To define a command, we can run the following command in our root directory.
```
domeniere create command <module>/path/to/the/command-name
```
This will create a directory for our command inside our specified module's `services` directory.

> **Note**: In order to create a command, you need to have created a module that will contain the command. See the [Modules](./modules) section for more details.

Below is an example of a `CreateAccountCommand` that is responsible for creating a User Account from a given registration.
```ts
import { Command } from '@domeniere/framework';
import { AccountCreated} from './../../events/events.well';
import { AccountFactory } from './../../factories/factories.well';
import { AccountRepository } from './../../repositories/repositories.well';

export class CreateUserCommand extends Command {

    private readonly accountRepository: AccountRepository;
    private readonly accountFactory: AccountFactory;

    constructor(accountFactory: AccountFactory, accountRepo: AccountRepository) {
        super();
        this.accountFactory = accountFactory;
        this.accountRepository = accountRepo;
    }

    public async execute(registration: UserRegistration): Promise<void> {
        const account = this.accountFactory.createFromRegistration(registration);

        try {
            await this.accountRepository.save(account);
            await this.emit(new AccountCreated(account));
        }
        catch(e) {
            throw new Error();
        }
    }
}
```
The only method we need to override in our command class is the `execute()` method, which contains the instructions for carrying out the command's responsibilities. The `execute()` method has the following signiture:
```ts
public async execute(arg1, arg2, ...): Promise<void>
```
All commands are asynchronous. THe `execute()` command can have as many arguments as it needs. And, since it is a command, it does not return anything upon its successful completioon. In our example, our `execute()` method is pretty straiht forward. We create a Account object using our `AccountFactory`'s `createFromRegistration()` method. We then save the created user to our `AccountRepository` and emit an `ccountCreated` event. We'll cover emitting events in a later section below.

Notice here the simplicity of our command. It is highly recommended to keep commands as simple as possible.

In many cases, domain services will require dependencies such as Factories and Repositories to help it perform its duties. In these cases, we can introduce such dependencies through the constructor. Notice here that we inject the required repository and factory, as opposed to hard coding the dependency directly. It is highly recommended to inject dpendencies through the constructor n order to keep your services as flexible and loosely coupled as possible.

## Queries
A `Query` retrieves or derrives some data from a source. Think of a `Query` as a read operation. A `Query` should not modify any kind of data. 

To define a query, we can run the following command in our root directory.
```
domeniere create query <module-name>/path/to/query-name
```
This will create a directory for our query inside our specified module's `services` directory.

> **Note**: In order to create a query, you need to have created a module that will contain the query. See the [Modules](./modules) section for more details.

Below is an example of a `GetUserByIdQuery`, which is tasked with getting an Account by its Id.
```ts
import { Query } from '@domeniere/framework`;
import { Account } from './../../aggregates/aggregates.well';
import { AccountRepository } from './../../repositories/repositories.well';
import { UserId } from './../../values/values/well';

export class GetAccountByIdQuery extends Query {

    private readonly accountRepository: AccountRepository;

    constructor(accountRepo: AccountRepository) {
        super();
        this.accountRepository = accontRepo;
    }

    public async execute(id: UserId): Promise<Account> {

        try {
            return await this.userRepository.getById(id);
        }
        catch(e) {
            throw new Error();
        }
    }
}
```
Similar to `Command`, we can inject dependencies throwugh the constructor.

Also similar to `Command`, we override the `execute()` command. However, the signiture of `Query`'s `execute()` method is a little bit different. Here is how it looks like.
```ts
public async execute(arg1, arg2, ...): Promise<any>
```
In our example, our `execute()` method takes an instance of UserId as its only argument, and returns an Account object, which is associated with the provided ID.

Like `Command`, query's `execute()` method also lets you define however many arguments you need in order for the query to perform its task. Unlike `Command` however, `Query` lets you return whatever type you need to. 

## Emitting Events
You may have noticed in our `Command` example we had a line that said the following.
```ts
await this.emit(new AccountCreated(account));
```
In many cases, different parts of your domain may need to respond to state changes. In order to notify your interested parties about a state change, services can emit events to inform interested parties about changes through the built in `emit()` method. 

To learn more about events, refer to the Events section.

## Registering Services
Something important that we have to do in order to ensure our services are available is to register them with our module. There are two ways to register our services. We can either register our services as `Factory Bindings` or as `Instance Bindings`.

### Factory Bindings
We create `Factory Bindings` inside our module's `createBindings()` method. We can create a binding to our service with the `bindService()` method.
```ts
this.bindService(ServiceClass, (module) => {
    return new ServiceClass(module.get(DependencyClass));
});
```
The `bindService()` method takes two arguments. The first is the class name of the service we want to bind. The second is a factory function to tell Domeniere how to instantiate our service. Once this is complete, we can now use our serive in our application.

You can learn more about module bindings in the [Modules](./modules) section.

### Instance Bindings
We create `Instance Bindings` inside our module's `createBindings()` method. We can create a binding to our service with the `bindServiceInstance()` method.
```ts
this.bindServiceInstance(ServiceClass);
```
The `bindServiceInstance()` method takes the class name of our service as its only argument. Once this is complete, we can now use our serive in our application.

You can learn more about module bindings in the [Modules](./modules) section.
