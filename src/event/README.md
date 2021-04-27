# Events
Domain Events represent the occurance of something of interest in your domain.

## Event Stores
Every Fragment project contains a single EventStore, wich is responsible for 

## Internal Events
Fragment defines a few internal events when certain thingxs occur in your domain.

### The EventBroadcastFailed Event
The EventBroadcastFailed indicates that the event store has failed to broadcast a batch of events. Every instance of the `EventBradcastFailed` event contains the error that was thrown when the error occured, which can be accessed through the `error()` method.

### The EventHandlerFailed Event
The `EventHandlerFailed` event indicates that an event handler has encountered an error. Every instance of `EventHandlerFailed` contians the handler that failed, the event that was being processed, and the error that was thrown.

### The EventStoreFailed Event
The `EventStoreFailed` event indicates that there was an error with the event store.The `EventStoreFailed` event contains the error that was thrown by the event store, which can be accessed using the `error()` method.

### The EventsPublished Event
The `EventsPublished` event indicates that there were events that were successfully braodcasted. Every instance of the `EventsPublished` event consists of the queue of the events that were published, which can be accessed with the `events()` method.

## Event Lifecycle


## Event Handlers

## Defining Custom Events

## Emitting Events

## Broadcasting Events

