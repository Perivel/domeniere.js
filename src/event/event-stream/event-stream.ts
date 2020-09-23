import { EventStreamInterface } from "./event-stream.interface";
import { EventEmitter } from "../event-emitter/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { Subscriber } from "../subscriber/subscriber";
import { EventHandler } from "../subscriber/event-handler.type";
import { SubscriberId } from "../subscriber/subscriber-id";
import { DefaultEventStore } from "../event-store/default-event-store";
import { UUID } from "foundation";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { schedule as scheduleTask, ScheduledTask, validate as validateCronExpression } from 'node-cron';
import { EventAggregate } from "../event-emitter/event-aggregate..type";

/**
 * Event Stream
 * 
 * Event Stream is the main Event Stream object responsible for emitting events.
 */

export class EventStream implements EventStreamInterface {
    // the global instance.
    private static _instance: EventStream;

    // The event publisher.
    private readonly emitter: EventEmitter;

    // event store
    private _eventStore: EventStore;

    // The event publisher task
    private _eventPublisherTask: ScheduledTask|null;

    private constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
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
     */

    public async emit(event: DomainEvent): Promise<void> {
        this.eventStore().store(event);
        await this.emitter.emit(event);
    }

    /**
     * eventStore()
     * 
     * eventStore() gets the event store.
     */

    public eventStore(): EventStore {
        return this._eventStore;
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

    /**
     * registerInternalHandlers()
     * 
     * reigster internal handlers here.
     */

    private registerInternalEventHandlers(): void {
        
        // register a handler to automatically save events on any event.
        this.subscribe(UUID.V4().id(), EventAggregate.Any.toString(), FrameworkEventHandlerPriority.HIGH, 'persist events', async () => {
            await EventStream.instance().eventStore().persistEvents();
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
            // publish the events.
            await EventStream
                .instance()
                .eventStore()
                .publishEvents();
        });
    }
}