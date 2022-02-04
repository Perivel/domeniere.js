# APIs
APIs define how users will interact with your application. Your API has three responsibilities -- communicating with external consumers, registering modules, and broadcasting events.

## Defining Your API
All Domeniere applications comes with an Api. Below is an example Api definition for a `Users` Api.
```ts
import { Api } from '@domeniere/framework';

export class UsersApi extends Api {

    constructor(eventStore: MyEventStore) {
        super('users', eventStore);
    }
}
```
The Api accepts the name of the subdomain for which your application belongs to, and an instance of your `EventStore`. Your subdomain name will default to the same name on your domconfig.json file. 

> **Note**: You can learn more about Event Stores in the [Events](./events) section.

## Registering Modules
It is in the API where modules are registered and made available to our Api. We register our modules in the constructor of our API.
```ts
import { Api } from '@domeniere/framework';
import { UsersModule, UsersRepository } from './users/users.module';

export class UsersApi extends Api {

    constructor(userRepository: UserRepository, eventStore: MyEventStore) {
        super('users', eventStore);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }
}
```
Notice here we use our module's `registerRepositoryInstance()` method to bind a repository instance to the module. We then register our module using the `registerModule()` methiod provided by our API. In this example, we only had one module with one external dependency. However, it is very common to have multiple modules with multiple dependencies. In those cases, we just repeat the steps illustrated above.

> **Note**: You can learn more about Module Bindings in the [Modules](./modules) section.

## Broadcasting Events
Broadcastng Events is a responsibility delegated to users of our application, instead of being done automatically. The reasoning for this is that most infrastructure/cloud services have their own mechanisms for things like scheduled jobs (CRON jobs). To tell Domeniere to broadcast your events, we can invoke the `broadcastEvents()` method.
```ts
// in our client app
const api = new UsersApi(new MyUsersRepository(), new MyEventStore());

// ... do some stuff to emit events

await api.broadcastEvents();
```

## Defining API Methods
We can define task-based methods in our Api to expose capabilities to our users.
```ts
import { Api } from '@domeniere/framework';
import { 
    UsersModule, 
    UsersRepository, 
    CreateUserCommand, 
    UserRegistrationSpecification,
    UserRegistrationData
 } from './users/users.module';

export class UsersApi extends Api {

    constructor(userRepository: UserRepository, eventStore: MyEventStore) {
        super('users', eventStore);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }

    public async createUser(registrationData: UserRegistrationData): Promise<void> {
        const registratiion = this.module('users')
            .get(UserRegistrationFactory)
            .createFromRegistrationData(registrationData);

        const canRegister = new UserRegistrationSpecification();

        if (!canRegister.isSatisfiedBy(registration)) {
            throw new Error("You do not meet the registration requirements");
        }

        await this.module('users')
            .get(CreateUserCommand)
            .execute(registration);
    }
}
```
Notice here the arguments we pass to our api are all instances of DTOs. When communicating with outside consumers, it is recommended that data be passed through DTOs. Also notice that the tasks performed by our API are done primarily by services, factories, and repositories within our modules, which we access through our Api's `domain` property. Organizing our codebase in this manner keeps our code clean, readable, and easy to maintain. When there is an error, we can either manually throw an exception or have one of our services throw one, which can then be handled in the infrastructure layer.

> **Note**: You can learn more about DTOs in the [Data Transfer Objects](./dtos) section.

To use our api method in a consumer application, we can use it like any other method.
```ts
const api = new UsersApi(new MyUsersRepository(), new MyEventStore(), new MyLogger());

const newUser = new UserData('John', 'Appleseed', 'john@appleseed.com');
try {
    await api.createUser(newUser);
    await api.broadcastEvents();
    // return 201 created response
}
catch(e) {
    // return a 400 error
}
```
Since this method has the possibility of throwiing an exception, we surround it in a try-catch block. Notice we also pass in a DTO as the parameters of our method.

You are free to define your API methods in however way you like. However, it is recommended these methods remain high level (that is, align with your requirements) and th low level details be left to the modules, repositories, services, and factories to handle.

## Important Notes
In your consumer application, it is highly recommended that you run the `initializeEvents()` method within youur startup script to properly sync events with your event store and the rest of your network.
```ts
// somewhere in your startup script
await api.initializeEvents();
```

## Event Handlers
Our Api is the recommended place to define `Event Handlers`. Below is an example of how we might define an event handler in response to an `AccountCreated` event.
```ts
import { Api } from '@domeniere/framework';
import { On } from '@domeniere/common';
import { UsersModule, UsersRepository } from './users/users.module';

export class UsersApi extends Api {

    constructor(userRepository: UserRepository, eventStore: MyEventStore) {
        super('users', eventStore);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }

    // ... other methods

    @On(AccountCreated)
    private sendWelcomeEmail(event: AccountCreated): Promise<void> {
        await this.domain
            .module('users')
            .get(SendWelcomeMessageCommand)
            .execute(event.account());
    }
}
```
Here, we define an Event Handler method which will send a Welcome message every time an `AccountCreated` event occurs. Notice here we are using the `On()` decorator. This is how we inform Domeniere that the method we just defined is intended to be an Event Handler method.

> **Note**: You can learn more about Event Handlers in the [Events](./events) section.

## Module References
In previous versions of DomeniereJS, it is very common to use string literals to access your module dependencies, as shown below.
```ts
await this.domain.module('foo').get(FooCommand).execute(args);
```
While this approach works, there are many drawbacks. First, having to type the path of the module every time you have to access it is very error prone. Second, the old approach gave you direct access to the underlying dependency container, opening the possibility to accidentally modify or delete it. In DomeniereJS v3, we solve these problems with a new feature called a `ModuleReference`. As the name implies, a `ModuleReference` is a reference to a module. A `ModuleReference` is a read-only wrapper around the underlying module, which only exposes the necessary `get()` method which is used to retrieve dependencies.

It does not stop there, though. DomeniereJS v3 also introduces a new `@ModuleRef()` property decorator. The `@ModuleRef()` property decorator assigns a `ModuleReference` to the property it is applied to. 
```ts
import { Api, ModuleReference } from '@domeniere/framework';
import { ModuleRef } from '@domeniere/common';
import { 
    UsersModule, 
    UsersRepository, 
    CreateUserCommand, 
    UserRegistrationSpecification,
    UserRegistrationData
 } from './users/users.module';

export class UsersApi extends Api {

    @ModuleRef('users')
    private readonly usersModule!: ModuleReference;

    constructor(userRepository: UserRepository, eventStore: MyEventStore) {
        super('users', eventStore);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }

    public async createUser(registrationData: UserRegistrationData): Promise<void> {
        const registratiion = this.usersModule
            .get(UserRegistrationFactory)
            .createFromRegistrationData(registrationData);

        const canRegister = new UserRegistrationSpecification();

        if (!canRegister.isSatisfiedBy(registration)) {
            throw new Error("You do not meet the registration requirements");
        }

        await this.usersModule
            .get(CreateUserCommand)
            .execute(registration);
    }
}
```
In the above snippet, we define a `ModuleReference` property, `usersModule`, and annotate it with the `@ModuleRef()` decorator. Here, we tell DomeniereJS to assign a module reference to the Users module to the `usersModule` property. In our API methods, we reference the `usersModule` property to access modules defined within that module. It is important to understand that using the `@ModuleRef()` decorator is equivalent to using the old `this.domain.module('users')` syntax. Using the `@ModuleRef()` property decorator is just more elegant and much less error prone, making your libraries more robust.

> **Note**: Since DomeniereJS v3, the `this.domain` property is deprecated and replaced with the `this.module(path)` method.