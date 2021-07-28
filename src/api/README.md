# APIs
APIs define how your domain communicates with the outside world. Your API has three responsibilities -- communicating with external consumers (your infrastructure), registering modules, and broadcasting events to external domains.

## Defining Your API
To define an API, we override the `Api` class.
```ts
import { Api } from '@periel/Vessel';

export class UsersApi extends Api {

    constructor(eventStore: MyEventStore, logger: MyLogger) {
        super(eventStore, logger);
    }
}
```
The Api accepts an instance of your `EventStore` and `Logger` as its arguments. The logger is optional and will use the console (console.log)()) if it is omitted.

For more information about `EventStore`s, see the [Events](./../event/README.md) section.

## Registering Modules
It is in the API where modules are registered and made available to the `Domain` object (see `Domain` section for more information on the `Domain`). We register our modules in the constructor of our API.
```ts
import { Api } from '@periel/Vessel';
import { UsersModule, UsersRepository } from 'path/to/users.module';

export class UsersApi extends Api {

    constructor(userRepository: UserRepository, eventStore: MyEventStore, logger: MyLogger) {
        super(eventStore, logger);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }
}
```
Notice here we use our module's `registerRepositoryInstance()` method to bind a repository that is defined in our infrastructure layer to the module (see the [Modules](./../module/README.md) section for more information about modules). We then register our module using the `registerModule()` methiod provided by our API. In this example, we only had one module with one external dependency. However, it is very common to have multiple modules with multiple dependencies. The concept for handling which, however, will remain the same.

## Broadcasting Events
Broadcastng Events is a responsibility delegated to the Infrasstructure layer, instead of being done automatically. The reasoning for this is that most infrastructure/cloud services have their own mechanisms for things like scheduled jobs (CRON jobs). To tell Vessel to broadcast your events, we can invoke the `broadcastEvents()` method.
```ts
const api = new UsersApi(new MyUsersRepository(), new MyEventStore());
await api.broadcastEvents();
```

## Defining API Methods
We can define our API methods in whatever way we need. Below is a very simple example, exposing one method.
```ts
import { Api, Domain } from '@periel/Vessel';
import { 
    UsersModule, 
    UsersRepository, 
    CreateUserCommand, 
    UserRegistrationSpecification,
    UserRegistrationData
 } from 'path/to/users.module';

export class UsersApi extends Api {

    constructor(userRepository: UserRepository, eventStore: MyEventStore, logger: MyLogger) {
        super(eventStore, logger);
        // register modules
        const userModule = new UserModule();
        userModule.registerRepositoryInstance(UserRepository, userRepository);
        this.registerModule(userModule);
    }

    public async createUser(registrationData: UserRegistrationData): Promise<void> {
        const registratiion = Domain.Module('users')
            .get(UserRegistrationFactory)
            .createFromRegistrationData(registrationData);

        const canRegister = new UserRegistrationSpecification();

        if (!canRegister.isSatisfiedBy(registration)) {
            throw new Error("You do not meet the registration requirements");
        }

        await Domain.Module('users')
            .get(CreateUserCommand)
            .execute(registration);
    }
}
```
Notice here the arguments we pass to our api are all instances of DTOs (see DTOs section for more information on this topic.). When communicating with outside consumers, it is recommended that data be passed through DTOs. Also notice that the tasks performed by our API are done primarily by services, factories, and repositories within our domain's modules which we access through our `Domain` object. Organizing our codebase in this manner keeps our code clean, readable, and easy to maintain. When there is an error, we can either manually throw an exception or have one of our services throw one, which can then be handled in the infrastructure layer.

To use our api method in our infrastructure layer, we can use it like any other method.
```ts
const api = new UsersApi(new MyUsersRepository(), new MyEventStore());

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
Notice here we call the api method like any other method in our infrastructure layer. Since this method has the possibility of throwiing an exception, we surround it in a try-catch block. Notice we also pass in a DTO as the parameters of our method.

You are free to define your API methods in however way you like. However, it is recommended these methods remain high level (that is, align with your requirements) and th low level details be left to the modules, repositories, services, and factories to handle.

## Important Notes
In your framework or infrastructure layer, it is highly recommended that you run the `initializeEvents()` method within youur startup script to properly sync events with your event store and the rest of your network.
```ts
// somewhere in your startup script
await api.initializeEvents();
```