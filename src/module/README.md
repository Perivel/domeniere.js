# Modules
Modules are containers for objects in your domain. Modules contain a collection of highly cohesive objects objects that serve a common purpose.

## Defining Modules
To define a module, we extend the `Module` class.
```ts
import { Module } from '@perivel/fragment';

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
In our `createBindings()`, we have four options for defining our bindings: `addFactoryBinding()`, `addRepository()`, `addServiceBinding()`, and `addServiceInstance()`.

### addFactoryBinding()
We can use the `addFactoryBinding()` method to create a binding for our factory. The `addFactoryBinding()` method takes two arguments: the name of the class we want to bind, and a factory function which tells our module how to instanciate that class. 

<insert code example here>

### addRepository()
We can add a repsitory to our module with the `addRepository()` method. The `addRepository()` method takes the repository class name as its single parameter. As discussed in the Repository section, we leave the implementation of the repository to the infrastructure layer (the framework you are using). Here, we are simply telling our module to expect an instnace of our repository class to be registered at a later time.

<insert code example here>

### addServiceBinding()
We can use the `addServiceBinding()` method to tell our module to a bindng for a service. `addServiceBinding()` takes two arguments: The name of the service class to bind and a factory function to tell the module how to instanciate that service.

<insert code example here>

### addServiceInstance()
Like `addRepository()`, `addServiceInstance()` tells our module to expect an instance of our service to be passed in at a later time. 

<insert code example here>

## Binding Instances to module Objects
As covered in the last section, we used `addRepository()` and `addServiceInstance()` to twll our module to expect an instance to be registered at a later time. When that time comes, we can use the `registerRepositoryInstance()` method to register a repository instance to our module, and the `registerServiceInstance()` method to register a service instance.

<insert code example here>

## Submodules
Sometimes, it makes sence to nest modules. In these cases, we can make use of a feature kniown as submoduling.

<insert code example here>