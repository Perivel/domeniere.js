import { EventStore, EventStream, DomainEvent, StoredEvent, TransmittedEvent, EventAggregate } from "@domeniere/event";
import { DateTime } from "@swindle/core";
import { Queue } from "@swindle/structs";
import { Stream } from "stream";

class MessageSent extends DomainEvent {
    private readonly _msg: string;

    constructor(message: string, occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
        this._msg = message;
    }

    public static EventName(): string {
        return "message-sent";
    }

    public message(): string {
        return this._msg;
    }

    serializeData(): string {
        return JSON.stringify({
            message: this.message()
        });
    }
}



class TestEventStore extends EventStore {

    constructor() {
        super();
    }

    protected async boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void> {
        eventsToPublish.toArray().forEach(event => console.log(`Broadcasting: ${event.eventName()}`));
    }
    protected async getLatestStoredEvent(): Promise<StoredEvent | null> {
        return new StoredEvent("dddd", "dfkalsdmf", "slfdjsdk", 1, "slfafa", DateTime.Now(), false, false);
    }
    public async getTransmittedEventsSince(date: DateTime | null): Promise<TransmittedEvent[]> {
        return [];
    }
    public async getUnpublishedEvents(): Promise<StoredEvent[]> {
        return [];
    }
    protected mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent {
        return new MessageSent(storedEvent.eventBody());
    }
    mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent {
        return new MessageSent(transmittedEvent.eventBody());
    }
    protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void> {
        eventQueue.toArray().forEach(event => console.log(`Saving ${event.eventName()}`));
    }
}

const main = async (): Promise<void> => {
    const stream = new EventStream(new TestEventStore());
    stream.subscribe(EventAggregate.Any, async (event) => {
        console.log(`Handling event ${event.eventName()} with data: ${event.serialize()}`);
    });
    await stream.emit(new MessageSent("This is a message."));
    await stream.publishEvents();
}

main().then(() => console.log("Finished!"))