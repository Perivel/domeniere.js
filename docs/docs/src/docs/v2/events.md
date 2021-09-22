# Events
Domain Events represent the occurance of something of interest in your domain.

## Event Stores
Every Domeniere project contains a single EventStore, which is responsible for persisting and broadcasting events. The `EventStore` is defined in your Domeniere project. However, it is implemented in your infrastructure layer (framework).

### Implementing the EventStore
All Domeniere applications come with their own `EventStore`. EventStores are only defined in our Domeniere application. We leave its implementation to the users of our application, so it can be adopted to its appropriate environment.

When defining our `EventStore`, there are six methods we need to override.

**braodcastEvents()**: 
The `broadcastEvents()` method broadcasts the events to the network. This usually involves sending the events to some kind of event bus, like Apache Kafka or Google Cloud PubSub. The actual serialization of the events to be broadcasted is left to the implementer. So, you have freedom to serialize the events in whatever way you see fit. Just be sure to document how you do so, as that will be necessary for converting the serialized event data back into an event object in the domains that consume the events.

The `broadcastEvents()` method has the following signiture.
```ts
protected abstract boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void>;
```
The `braodcastEvents()` method takes two arguments. The first argument is the queue of events to be broadcasted. As each event is broadcasted successfully, it should be removed from the `eventsToPublish` queue and added to the `publishedEvents` queue.

In the event of an error, the `broadcastEvents()` method throws any kind of exception. You can alternatively add some retry logic to this method if you like.

**getLatestStoredEvent()**: 
The `getLatestStoredEvent()` method retrieves the most recent event the EventStore has in storage.

The `getLatestStoredEvent()` method has the following signuture.
```ts
protected getLatestStoredEvent(): Promise<StoredEvent | null>
```
If there is no events in the event store, then null is thrown. Otherwise, a `StoredEvent` instance is returned. 

If there is an error getting the event (for example, there is an error connecting to the database storing the evnets), an exception is thrown. It is worth noting that it is also a good idea to insert some retry logic into these methods.

**getTransmittedEventsSince()**: 
The `getTransmittedEventsSince()` gets events from an external source from a given date until the most recent event. If there is no date passed (date is null), it is an indication that the event store does not have any events. So, it should return all the events.

The `getTransmittedEventsSince()` method has the following signiture.
```ts
public async getTransmittedEventsSince(date: DateTime|null): Promise<TransmittedEvent[]>
```
The `getTransmittedEventsSince()` method gets the date of the last event the event store knows of, or null if the event store has no events. It then returns an array of `TransmittedEvents` containing the event data. If there is an error, an exception is thrown.

**getUnpublishedEvents()**: 
The `getUnpublishedEvents()` gets the unpublished events from storage.

The `getUnpublishedEvents()` method has the following signiture.
```ts
public async getUnpublishedEvents(): Promise<StoredEvent[]>
```
The `getUnpublishedEvents()` method returns an array of StoredEvent instances which all represent the events that were intended to be broadcasted, but have yet to be. 

If there is an error, an exception should be thrown.

**mapStoredEventToDomainEvent()**: 
The `mapStoredEventsToDomainEvents()` method accepts an instance of a `StoredEvent` and returns a corresponding instance of `DomainEvent`. 

The `mapStoredEventToDomainEvent()` method has the following signiture.
```ts
protected mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent
```
If you are unable to map the `StoredEvent` to a `DomainEvent`, an exception is thrown.

**mapTransmittedEventToDomainEvent()**: 
The `mapTransmittedEventToDomainEvent()` method accepts an instance of `TransmittedEvent` and returns a corresponding instance of `DomainEvent`. 

The `mapTransmittedEventToDomainEvent()` method has the following signiture.
```ts
public mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent
```
If you are unable to convert a transmitted event to a domain event, an exception should be thrown.

**storeEvents()**: 
The `storeEvents()` method persists the domain events into storage. 

The `storeEvents()` method has the following signiture.
```ts
protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>
```
As each event is successfully persisted, the event should be removed from the events queue. If there is an error, an exception should be thrown. It is also a good idea to insert some retry logic into this method. Here, the events that are passed into `saveEvents()` are not neccesarily new events. Some of these events have already been previously persisted and are just being updated (marked as published).

### Persisting Internal Events (Optional)
By default, Internal Events are not persisted. If you wish to save internal events, you can override the `shouldSaveInternalEvents()` method.
```ts
protected shouldSaveInternalEvents(): boolean {
    return true;
}
```

### Broadcasting Internal Events
By default, Internal Events are not broadcasted. if this is a behavior you wish to change, override the `shouldBroadcastInternalEvents()` method.
```ts
protected shouldBroadcastInternalEvents(): boolean {
    return true;
}
```

## Internal Events
Domeniere defines a few internal events when certain thingxs occur in your domain.

### The EventBroadcastFailed Event
The EventBroadcastFailed indicates that the event store has failed to broadcast a batch of events. Every instance of the `EventBradcastFailed` event contains the error that was thrown when the error occured, which can be accessed through the `error()` method.

### The EventHandlerFailed Event
The `EventHandlerFailed` event indicates that an event handler has encountered an error. Every instance of `EventHandlerFailed` contians the handler that failed, the event that was being processed, and the error that was thrown.

### The EventStoreFailed Event
The `EventStoreFailed` event indicates that there was an error with the event store.The `EventStoreFailed` event contains the error that was thrown by the event store, which can be accessed using the `error()` method.

### The EventsPublished Event
The `EventsPublished` event indicates that there were events that were successfully braodcasted. Every instance of the `EventsPublished` event consists of the queue of the events that were published, which can be accessed with the `events()` method.

## Event Lifecycle
The life cycle of an event consists of four phases. These are the **Perisistence phase**, the **Handle phase**, the **Broadcast phase**, and the **Post-Processing phase**. 

### The Persistence Phase
The persistence phase is the first phase an event goes through when it is first emitted. In this phase, a `StoredEvent` counterpart for the event is greated and added to a persistence queue. Domeniere then executes the `EventStore`'s `saveEvents()` method to save the event to storage. if the event should be broadcasted, it is added to a publish queue, which will be broadcasted later.

### The Local Handler Phase
The next phase in the event lifecycle is the Local Handler phase. In this phase, the event is dispatched to all the handlers listening for that event. Each of the handlers are then executed in order of their priority (higheest to lowest). 

### The Broadcast Phase
The broadcast phase begins when the API's `publishEvents()` method is called. Domeniere calls the `EventStore`'s `broadcastEvents()` method where the events are broadcasted and added to the post-publish queue.

### The Post-Processing Phase
The post-processing phase final phase in an event's lifecycle. Here, the now published event will undergo some final processing before its lifecycle ends.

## Event Handlers
Event Handlers are methods that are automatically executed in response to some event that has been emitted. Event Handlers are usually defined in the `Api` class of your Domeniere Application. All event handlers have the following signiture.
```ts
async methodName(event: DomainEvent): Promise<void>
```
> **Note**: You can learn more about Apis in the Apis section.

> **Note**: The type of the `event` argument of an Event Handler can be any class that extends `DomainEvent`.

The Event Hanlder receives the event as its argument. And it is free to do whatever it needs to do in response to the event being emitted. 

To tell Domeniere this method is an event listener, we need to decorate it with an event decorator. There are four types of event decorators we can use.

**@On(Event)**: 
The most basic event decorator we can use is the `@On` decorator. The `@On` decorator takes the class name of the event we want the handler to be called on.

Below is an example of an event handler decorated with the `@On()` decorator.
```ts
@On(UserCreated)
public async logUserId(event: UserCreated): Promise<void> {
    const createdUser = event.user();
    console.log(createdUser.id());
}
```
Notice here that we pass the class name of the event to the `On()` decorator (in this case, `UserCreated`). This tells Domeniere that this method is instended to be an event listener that will be called whenever the `UserCreated` event is emitted.

**@OnInternal()**: 
The `@OnInternal` decorator tells Domeniere that the method it is attached to is an event handler that should be executed on any internal events. Internal events are events defined by the Domeniere library. For more information on Internal Events, see the Internal Events section above.

Below is an example of an event handler decorated with the `@OnInternal` decorator.
```ts
@OnInternal()
public async handleEvent(event: DomainEvent): Promise<void> {
    console.log(event);
}
```
Unlike the `@On()` decorator, the `@OnInternal()` decorator does not accept any event as an argument. Instead, the handler will be called on any type of internal event that is emitted.

**@OnError()**: 
The @OnError() decorator tells Domeniere that the method attached is a listener that should be called on all error events. As their name implies, Error Events are events that indicate an error has occured. 

Below is an example of a listener decorated with the `@OnError()` decorator.
```ts
@OnError()
public async handleError(event: DomainEvent): Promise<void> {
    console.log(event);
}
```

**@OnAny()**: 
The `@OnAny()` is the most braod decorator. @OnAny() tells Domeniere the method it is attached to is a listener that should be triggered whenever any kind of event is emitted.

Below is an example of an event handler decorated with the `@OnAny()` decorator.
```ts
@OnAny()
public async handleEvent(event: DomainEvent): Promise<void> {
    console.log(event);
}
```

> **Note**: Event Decorators are imported from the `@domeniere/common` package, which is included in all Domeniere applications.

### Customizing Handler Behavior
There are a few modifiers and metadata we can attach to customize how the event handler behaves. We have listed them out below in the order they should be passed in.

**Priority**
The priority of the event handler indicates the order in which the modifiers are executed. Higher priority means the earlier that handler will be executed. By default, the handler priority is set to medium.

**label**
The label is unique label for that handler. This label is only used for your own reference (i.e. when identifying the handler during an `EventHandlerFailed` event). By default, the label is set to a random string.

**stopPropogationOnError**
This is a flag that tells Domeniere to stop propogating the event to subsequent handlers if this event handler fails (that is, it throws an exception). By default, this is set to `false`.

## Defining Custom Events
While Domeniere provides quite a few internal events you can listen to, you often also need to be able to define your own events that are specific to your domain. 

To define an event, we can run the following command in our root directory.
```
domeniere create event <module-name>/path/to/the/event-name
```
This will create an event file in our specified module's `events` subdirectory.

> **Note**: In orfer to create an event, you need to have created a module that will contain the event. See the Modules section for more details.

Custom events take two optional arguments. The first is the timestamp of when the event occurs. By default, this is the current date and time in UTC. The second argument is a unique id for the event instance. When it is set to `undefined`, a random unique ID is generated for us by the `DomainEvent` class.

When defining your custom events, there are three required methods you must override.

The first method is the `EventName()` method. The `EventName()` method returns the name of the event.
```ts
export class AccountCreated extends DomainEvent {

    constructor(occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
    }

    Public static EventName(): string {
        return 'account-created';
    }
}
```
The event name is actual name of the event. It is recommended event names be short, descriptive, and if more than a single word, separated by a dash (-) character. 

The second method we need to override is the `EventClassification()` method. The `EventClassification()` method indicates which subdomain or group the event belongs to. This will normally be the name of your Domeniere project that is specified in your domconfig.json file. 

> **Note**: Domeniere uses this classification name to determine which Event Stream to publish the event to. If you need to specify some grouping identifier in your event classification, you can designate it with a color (`:`) character right after the default classification. For example, if you wanted to attach a `"registration"` tag and your default classification name was `"users"`, the name `"users:registration"` would be perfectly legal.
```ts
import { DomainEvent } from '@domeniere/event';


export class AccountCreated extends DomainEvent {

    constructor(occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
    }

    Public static EventName(): string {
        return 'account-created';
    }

    public static EventClassification(): string {
        return 'users';
    }
}
```
The third method we need to override is the `EventVersion()` method. The event version is a numeric id to the version of the event. This is most useful when you later have to update your event, to tell your event consumers which version of your event they are receiving. This way, they are able to parse and properly consume it.
```ts
import { DomainEvent } from '@domeniere/event';


export class AccountCreated extends DomainEvent {

    constructor(occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
    }

    Public static EventName(): string {
        return 'account-created';
    }

    public static EventClassification(): string {
        return 'users';
    }

    public static EventVersion(): number {
        return 1.0;
    }
}
```
By default, the event version of any event is 1.0. As the event evolves and changes overtime, however, this may change.

The last method we need to override is the `serializeData()` method. The `serializeData()` method tells the event how to serialize the custom daata you have given it.
```ts
import { DomainEvent } from '@domeniere/event';


export class AccountCreated extends DomainEvent {

    constructor(occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
    }

    Public static EventName(): string {
        return 'account-created';
    }

    public static EventClassification(): string {
        return 'users';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public serializeData(): string {
        return JSON.stringify({

        });
    }
}
```
As we have not yet fully define our `CreatedUser` event, we will save the details of this method for later. For now, let's define our `AccountCreated` event.
```ts
import { DomainEvent } from '@domeniere/event';
import { Account } from './../../aggregates/aggregates.well';

export class AccountCreated extends DomainEvent {

    private readonly _account: Account;

    constructor(account: Account, occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
        this._account = account;
    }

    Public static EventName(): string {
        return 'account-created';
    }

    public static EventClassification(): string {
        return 'users';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public serializeData(): string {
        return JSON.stringify({
            account: this.account().serialize()
        });
    }

    public account(): Account {
        return this._account;
    }
}
```
Notice here our completed `AccountCreated` event class. We simply add one additional property to hold the account object that was created. And, we add a getter method to get the created account.

Notice our `serializeData()` method how includes a field for our Account. 

### Event Metadata
Sometimes, we want to modify the behavior of our events. To do so, we can override a few methods in our event class.

**Error Events**
Error Events are events that indicate an error has occured. Examples of such events include Domeniere's very own `EventHandlerFailed` event. Error events are dispatched to handlers intended to execute on any kind of error (that is, handlers decorated with the `@OnError()` decorator). 

To mark an event as an error event, we override the `isError()` method.
```ts
public isError(): boolean {
    return true;
}
```
By default, events are not marked as error events.

**Broadcasting Events**
By default, all custom events are automatically marked to be broadcasted. An event marked to be broadcasted will be add to the publish queue and broadcasted to other domains in your network. If we do not want a custom event to be broadcasted, we can override the `shouldBeBroadcasted()` method of our event class.
```ts
public shouldBeBroadcasted(): boolean {
        return false;
    }
```
By default, all custom events are marked to be broadcasted.

## Emitting Events
Now that we have created our event, it is time to use it. In most cases, Domain Services are the primary objects that will be emitting events. As such, Domain Services can emit events through their built in `emit()` method.
```ts
export class CreateUser extends Command {
    constructor(...) {...}

    public async execute(registration: UserRegistration): Promise<void> {
        // .....
        await this.emit(new AccountCreated(user));
    }
}
```
Notice here we use the `emit()` method to emit an event from the Domain Service (to learn more about Domain Services, see the [Services](./../service/README.md) section).

Another common place to emit events is inside event handlers. Event handlers are usually created in the `Api`. The `Api` class also exposes an `emit()` method which is used to emit events.
```ts
@On(SomeEvent)
private async handleEvent(event: SomeEvent): Promise<void> {
    // ... do some stuff
    await this.emit(new AnotherEvent(...));
}
```
> **Note**: You can learn more about the `Api` in the Apis section.

## Broadcasting Events
To broadcast our events over a network, we use our `Api`'s `broadcastEvents()` method. To learn more about the `Api`, see the [Api](./../api/README.md) section.
