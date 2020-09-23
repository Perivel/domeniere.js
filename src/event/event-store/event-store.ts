import { Queue } from "foundation";
import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";

/**
 * EventStore
 * 
 * EventStore defines the event store.
 */

export abstract class EventStore {

    private _storageQueue: Queue<StoredEvent>;
    private _publishQueue: Queue<DomainEvent>;

    constructor() {
        this._storageQueue = new Queue<StoredEvent>();
        this._publishQueue = new Queue<DomainEvent>();
    }

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() braodcasts the domain events.
     * @param eventQueue The queue of events to broadcast.
     */

    protected async abstract boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void>;

    /**
     * publishEvents()
     * 
     * publishEvents() publishes the domain events.
     * @emits EventBraodcastFailed event when there is an error broadcasting the events.
     */

    public async publishEvents(): Promise<void> {
        try {
            await this.boradcastEvents(this._publishQueue);
        }
        catch(error) {
            // something went wrong broadcasting the events.
            throw error;;
            
        }
    }

    /**
     * persistEvents()
     * 
     * persistEvents() perisists the events to storage.
     * 
     */

    public async persistEvents(): Promise<void> {

        try {
            await this.saveEvents(this._storageQueue);
        }
        catch(err) {
            // something went wrong saving the event.
            throw err;
        }
    }


    /**
     * saveEvents()
     * 
     * saveEvents() persists the events to storage..
     * @param event the queue of events to persist in storage.
     * @throws Any kind of exception when an error occurs.
     */

    protected async abstract saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;

    /**
     * shouldBroadcastInternalEvents()
     * 
     * shouldBroadcastInternalEvents() detemrines if internal events should be broadcasted.
     */

    protected shouldBroadcastInternalEvents(): boolean {
        return false;
    }

    /**
     * shouldSaveInternalEvents()
     * 
     * shouldSaveInternalEvents() determines if internal events should be saved.
     */
    protected shouldSaveInternalEvents(): boolean {
        return false;
    }

    /**
     * store()
     * 
     * store() stores the event.
     * @param event The event to store.
     */

    public async store(event: DomainEvent): Promise<void> {

        // determine if the event should be stored.
        if (!event.isInternal() || this.shouldSaveInternalEvents()) {
            // create the SotoredEvent
            const storedEvent = new StoredEvent(
                event.eventId().id(),
                event.eventName(),
                event.eventClassification(),
                event.eventVersion(),
                event.serialize(),
                event.occuredOn()
            );

            // add the event to the storage queue.
            this._storageQueue.enqueue(storedEvent);

            // determine if the event should be published.
            
            if ((event.shouldBeBroadcasted() && !event.isInternal()) || this.shouldBroadcastInternalEvents()) {
                // add event to publish queue
                this._publishQueue.enqueue(event);
            }
        }
    }
}