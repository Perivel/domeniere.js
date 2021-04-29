# Domain
The domain represents the context or area in which your code operates on. Your domain contains information about modules, events, and other information. The Domain has two primary responsibilities: Managing modules and Managing Events.

## Managing Modules
Your `Domain` is responsible for managing modules. As such, we can access module services, factories, and repositories from the `Domain`.

### Registering Modules
It is recommended that modules be registered at the `Api` class. For more informatioin about registering modules with the `API` class, see the `API` section.

### Accessing Modules
To access objects in your module using the `Module()` method. 
```ts
const user = await Domain.Module('users').get(CreateUserCommand).execute(registration);
```
Here, we are accessing our `CreateUserCommand` service from our `users` module. 

We can also access submodules using dot-notation.
```ts
const profile = Domain.Module('users.profile').get(ProfileFactory).createFromData(profileData);
```
Here, we are accessing our ProfileFactory class from the `profile` submodule of our `users` module.

## Managing Events
THe `Domain` manages the flow of events throughout your domain using its `EventStream`. Every time you emit an event, the `Domain` is responsible for storing that event, making sure it is received by all relevant handlers, and broadcasted to other domains in your system.

### Subscribing to Events
It is mentioned in the `Events` section that Event Handlers (or subscribers) are created by using event decorators. While that is the most common way to create an event listener, you can also create event handlers directly from the `Domain` through its `EventStream`. 
```ts
Domain.EventStream().subscribe(UserCreated.EventName(), async (event: DomainEvent) => {
    console.log(event);
});
```
We register event handles using the `EventStream`'s `subscribe()` method. We pass in the name of the event we want to listen to. And, we pass in a handler function to be executed when the event is emitted. we can also pass in the same optional arguments described in the `Events` section to custiomize the behavior of the handler.

### Emitting Events
We can also emit events directly from the `Domain`'s `EventStream`. To do so, we use the `emit()` method.
```ts
await Domain.EventStream().emit(new UserCreated(user));
```
We pass the instance of the event we are emitting as the argument to the `emit()` method. This will initiate the `Event Lifecycle` as described in detail in the Events section. 