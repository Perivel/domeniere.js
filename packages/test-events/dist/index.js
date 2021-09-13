"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
class MessageSent extends event_1.DomainEvent {
    constructor(message, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._msg = message;
    }
    static EventName() {
        return "message-sent";
    }
    message() {
        return this._msg;
    }
    serializeData() {
        return JSON.stringify({
            message: this.message()
        });
    }
}
class TestEventStore extends event_1.EventStore {
    constructor() {
        super();
    }
    async boradcastEvents(eventsToPublish, publishedEvents) {
        eventsToPublish.toArray().forEach(event => console.log(`Broadcasting: ${event.eventName()}`));
    }
    async getLatestStoredEvent() {
        return new event_1.StoredEvent("dddd", "dfkalsdmf", "slfdjsdk", 1, "slfafa", core_1.DateTime.Now(), false, false);
    }
    async getTransmittedEventsSince(date) {
        return [];
    }
    async getUnpublishedEvents() {
        return [];
    }
    mapStoredEventToDomainEvent(storedEvent) {
        return new MessageSent(storedEvent.eventBody());
    }
    mapTransmittedEventToDomainEvent(transmittedEvent) {
        return new MessageSent(transmittedEvent.eventBody());
    }
    async saveEvents(eventQueue) {
        eventQueue.toArray().forEach(event => console.log(`Saving ${event.eventName()}`));
    }
}
const main = async () => {
    const stream = new event_1.EventStream(new TestEventStore());
    stream.subscribe(event_1.EventAggregate.Any, async (event) => {
        console.log(`Handling event ${event.eventName()} with data: ${event.serialize()}`);
    });
    await stream.emit(new MessageSent("This is a message."));
    await stream.publishEvents();
};
main().then(() => console.log("Finished!"));
//# sourceMappingURL=index.js.map