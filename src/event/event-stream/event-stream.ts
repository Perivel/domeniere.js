import { EventStreamInterface } from "./event-stream.interface";
import { EventEmitter } from "../event-emitter/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { Subscriber } from "../subscriber/subscriber";
import { EventHandler } from "../subscriber/event-handler.type";
import { SubscriberId } from "../subscriber/subscriber-id";
import { DefaultEventStore } from "../event-store/default-event-store";
import { NetworkEventQueue, NetworkEventQueueInterface } from "../../common/common.module";
import { DefaultNetworkEventQueue } from "../../common/objects/default-network-event-queue";


export class EventStream implements EventStreamInterface {
    // the global instance.
    private static _instance: EventStream;

    // The event publisher.
    private emitter: EventEmitter;

    // event store
    private _eventStore: EventStore;

    // The publish queue.
    // The publish queue is the queue used specifically for events awaiting to
    // be published to the public queue.
    private _publishQueue: NetworkEventQueue;

    // The Public Queue
    // The public Queue is the queue that is exposed to the whole network.
    private _publicQueue: NetworkEventQueue;

    // indicates whether or not internal events should be saved.
    private _shouldSaveInternalEvents: boolean;


    private constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
        this._publicQueue = new DefaultNetworkEventQueue();
        this._publishQueue = new DefaultNetworkEventQueue();
        this._shouldSaveInternalEvents = false;
    }

    /**
     * instance()
     * 
     * instance() gets the instance of the event stream.
     */

    public static instance(): EventStream {

        if (!EventStream._instance) {
            EventStream._instance = new EventStream();
        }

        return EventStream._instance;
    }

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     * @throws UndefinedEventStoreException 
     * @emits EventStorageFailed when the event couldn't be stored.
     */

    public async emit(event: DomainEvent): Promise<void> {

        try {
            // save the event
            //await this.eventStore().store(event);

            if (event.isInternal()) {
                // only store if it is specified that internal events must be stored.
                if (this._shouldSaveInternalEvents) {
                    await this.eventStore().store(event);
                }
            }
            else {
                // events must be stored regardless.
                await this.eventStore().store(event);
            }
        }
        catch(err) {
            // failed to store the event.

        }

        // emit the event.
        await this.emitter.emit(event);
    }

    /**
     * eventStore()
     * 
     * eventStore() gets the EventStore instance.
     */

    public eventStore(): EventStore {
        return this._eventStore;
    }

    /**
     * saveInternalEvents()
     * saveInternalEvents() indicates that internal framework events should be saved.
     */

    public saveInternalEvents(): void {
        this._shouldSaveInternalEvents = true;
    }

    /**
     * setEventStore()
     * 
     * setEventStore() sets the event store.
     */

    public setEventStore(eventStore: EventStore): void {
        this._eventStore = eventStore;
    }

    /**
     * setPublicQueue()
     * 
     * sets the public queue.
     * @param queue The queue to set.
     */

    public setPublicQueue(queue: NetworkEventQueueInterface): void {
        this._publicQueue = queue;
    }

    /**
     * setPublishQueue()
     * 
     * sets the publish queue.
     * @param queue The queue to set.
     */

    public setPublishQueue(queue: NetworkEventQueueInterface): void {
        this._publishQueue = queue;
    }

    /**
     * creates a subscriber for the event stream.
     * @param id The id of the subscriber.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if the event propogation should stop when the subscriber handler encounters an error.
     */

    public subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError: boolean = false): void {
        const subscriberId = new SubscriberId(id);
        const subscriber = new Subscriber(subscriberId, eventName, priority, label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
}