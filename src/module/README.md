# Modules
Modules are containers for objects in your domain. Modules contain a collection of highly cohesive objects objects that serve a common purpose.

## Defining Modules
To define a module, we extend the `Module` class.
```ts
import { Module } from '@perivel/Vessel';

export class UserModule extends Module {

    constructor() {
        super("users");
    }
}
```
Here, we are defining a Users module, by passing in the name of the module in the constructor. Module names can be any combination of alphabetical character, numbers, dashes (-), and underscores (_). The only requirement is that each module name must be unique. The module name is what will be used to refer to objects within that module during Dependency Injection.

## Adding Bindings to the Module
Once we have created our module, we can add bindings to it. That is, we can put stuff in our container. We can add Factories, Services, and Repositories to our modules. We add these things to our module through what is called a binding. A binding is a a link between our classes and something else. There are two types of bindings we can create. A `Factory Binding` binds our classes to a factory function, which tells our module how to instanciate that class. An `Instance Binding` establishes a link between our class and a specific instnace of our class, which is either pre-defined or defined during runtime.

We create bindings in our module's `createBindings()` method.
```ts
export class UserModule extends Module {

    constructor() {
        super("users");
    }

    protected createBindings(): void {
        // code goes here.
    }
}
```
In our `createBindings()`, we have four options for defining our bindings: `bindFactory()`, `bindRepository()`, `bindService()`, and `bindServiceInstance()`.

### bindFactory()
We can use the `bindFactory()` method to create a binding for our factory. The `bindFactory()` method takes two arguments: the name of the class we want to bind, and a factory function which tells our module how to instanciate that class. 

```ts
this.bindFactory(UserFactory, (module) => {
    return new UserFactory();
});
```
Notice here we are adding a UserFactory binding to our module. In our factory function, we tell our module how to instanciate an instance of UserFactory.

### bindRepository()
We can add a repsitory to our module with the `bindRepository()` method. The `bindRepository()` method takes the repository class name as its single parameter. As discussed in the Repository section, we leave the implementation of the repository to the infrastructure layer (the framework you are using). Here, we are simply telling our module to expect an instnace of our repository class to be registered at a later time.

```ts
this.bindRepository(UserRepository);
```
Here, we simply pass in the name of the repository. This tells our module that it should expect to receive an instance of UserRepository at a later time.

### bindService()
We can use the `bindService()` method to tell our module to a bindng for a service. `bindService()` takes two arguments: The name of the service class to bind and a factory function to tell the module how to instanciate that service.

```ts
this.bindService(CreateUserCommand, (module) => {
    return new CreateUserCommand(
        module.get(UserFactory),
        module.get(UserRepository),
    );
});
```
Notice here we create a service binding in much the same way we did a factory binding. However, you may have noticed there is a slight difference in that we refer to the module to instanciate any other dependencies our service may need. In our case, our CreateUserCommand requires a UserFacory and a UserRepository.

### bindServiceInstance()
Like `bindRepository()`, `bindServiceInstance()` tells our module to expect an instance of our service to be passed in at a later time. 

```ts
this.bindServiceInstance(GeocodeService);
```
Notice here that we are registering a GeocodeService in much the same way as we did with adding a repository.

## Binding Instances to module Objects
As covered in the last section, we used `bindRepository()` and `bindServiceInstance()` to twll our module to expect an instance to be registered at a later time. When that time comes, we can use the `registerRepositoryInstance()` method to register a repository instance to our module, and the `registerServiceInstance()` method to register a service instance.

```ts
this.registerRepositoryInstance(UserRepository, new MongoUserRepository());
this.registerServiceInstance(GeocodeService, new GoogleGeocodeService());
```
Here, we use the `registerRepositoryInstance()` to register a repository instance to the module that we defined earlier. And, we use the `registerSeviceInstance()` method to register an instance of a service.

## Submodules
Sometimes, it makes sence to nest modules. In these cases, we can make use of a feature kniown as submoduling. As its name implies, submodules are modules within modules.

### Creating a Submodule
We create a submodule in much the same way we create regular modules.
```ts
import { Module } from '@perivel/Vessel';

export class UserModule extends Module {

    constructor() {
        super("users.registration");
    }
}
```
Notice here, we are creating a submodule of the users module called `registration`. We denote a submodule using the dot-notation. Later, when referring to our registration submodule in much the same way: `users.registration`.