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
import { EventStoreFailed } from "../libevents/event-store-failed.event";
import { EventStored } from "../libevents/event-stored.event";
import { UUID, Queue } from "foundation";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { schedule as scheduleTask, ScheduledTask, validate as validateCronExpression } from 'node-cron';


export class EventStream implements EventStreamInterface {
    // the global instance.
    private static _instance: EventStream;

    // The event publisher.
    private readonly emitter: EventEmitter;

    // Backlog Event Queue
    private readonly _backlogEventQueue: Queue<DomainEvent>;

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

    // The event publisher task
    private _eventPublisherTask: ScheduledTask|null;


    private constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
        this._publicQueue = new DefaultNetworkEventQueue();
        this._publishQueue = new DefaultNetworkEventQueue();
        this._shouldSaveInternalEvents = false;
        this._backlogEventQueue = new Queue<DomainEvent>();
        this._eventPublisherTask = null;

        // Register internal event handlers.
        this.registerInternalEventHandlers();
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

    public static PublishEventsWithinInterval(interval: number): void {

        if ((interval < 1) || (interval > 59)) {
             throw new Error('out of range.');
        }
        EventStream.instance().scheduleEventPublisherInterval(`*/${interval} * * * *`);
    }

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     * @throws UndefinedEventStoreException 
     * @emits EventStoreFailed when the event couldn't be stored.
     */

    public async emit(event: DomainEvent): Promise<void> {

        try {
            if (!event.isInternal() || this._shouldSaveInternalEvents) {
                await this.eventStore().store(event);
                this._backlogEventQueue.enqueue(event);
                await EventStream.instance().emit(new EventStored(event));
            }
        }
        catch(err) {
            // failed to store the event.
            await EventStream.instance().emit(new EventStoreFailed(event, err as Error));
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

    public setPublicQueue(queue: NetworkEventQueue): void {
        this._publicQueue = queue;
    }

    /**
     * setPublishQueue()
     * 
     * sets the publish queue.
     * @param queue The queue to set.
     */

    public setPublishQueue(queue: NetworkEventQueue): void {
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

    // helpers

    private registerInternalEventHandlers(): void {

        // register a listener to add the event to the publishQueue
        this.subscribe(UUID.V4().id(), EventStored.EventName(), Number(FrameworkEventHandlerPriority.VERY_HIGH), 'add-event-to-publish-queue', async (event: DomainEvent) => {

            let eventToAdd: DomainEvent|null = null;
            while(!this._backlogEventQueue.isEmpty()) {
                eventToAdd = this._backlogEventQueue.peek();
                await this._publishQueue.enqueue(eventToAdd);
                this._backlogEventQueue.dequeue();
            }
        }, false);
    }

    /**
     * Schedules the interval when events are to be published to the public queue.
     * @param cronExpression THe cron expression
     */

    private scheduleEventPublisherInterval(cronExpression: string): void {
        if (this._eventPublisherTask) {
            this._eventPublisherTask.destroy();
        }

        // validate
        if (!validateCronExpression(cronExpression)) {
            // invalid chron expression.
            throw new Error('Invalid Interval.');
        }

        this._eventPublisherTask = scheduleTask(cronExpression, async () => {
            // get the event from publish queue.

            // post the event to public queue.
        });
    }
}