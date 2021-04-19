import { EventStreamInterface } from "./event-stream.interface";
import { EventEmitter } from "../event-emitter/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { Subscriber } from "../subscriber/subscriber";
import { EventHandler } from "../subscriber/event-handler.type";
import { SubscriberId } from "../subscriber/subscriber-id";
import { DefaultEventStore } from "../event-store/default-event-store";
import { OutOfBoundsException, UUID, Duration, MethodUndefinedException } from "foundation";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { schedule as scheduleTask, ScheduledTask, validate as validateCronExpression } from 'node-cron';
import { EventAggregate } from "../event-emitter/event-aggregate..type";
import { EventStoreFailed } from "../libevents/event-store-failed.event";
import { EventBroadcastFailed } from "../event.module";
import { InvalidEventPublishIntervalException } from './invalid-event-publish-interval.exception';
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";

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

    constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
        this._eventPublisherTask = null;


        // Register internal event handlers.
        this.registerInternalEventHandlers();
    }

    /**
     * publishEvents()
     * 
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */

    public async publishEvents(): Promise<void> {
        await this.eventStore().publishEvents();
    }

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     */

    public async emit(event: DomainEvent): Promise<void> {
        await this.eventStore().store(event);
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
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber. The higher  the priority, the earlier the handler will be executed.
     * @param label a label to give to the subscriber. This label is only for your own reference, hence it is optional and defaults to an empty string.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if the event propogation should stop when the subscriber handler encounters an error.
     */

    public subscribe(eventName: string|EventAggregate, handler: EventHandler, priority: FrameworkEventHandlerPriority|DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = '', stopPropogationOnError: boolean = false): void {
        const subscriberId = new SubscriberId(UUID.V4().id());
        const subscriber = new Subscriber(subscriberId, eventName.toString(), Number(priority), label, handler, stopPropogationOnError);
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
        this.subscribe(EventAggregate.Any.toString(),async () => {
            try {
                await this.eventStore().persistEvents();
            }
            catch(err) {
                // failed to store some or all the events.
                await this.emit(new EventStoreFailed(err));
            }

        }, FrameworkEventHandlerPriority.HIGH, 'persist events', false);
    }

    /**
     * Schedules the interval when events are to be published to the public queue.
     * @param cronExpression THe cron expression
     * @throws InvalidEventPublishIntercalException when an invalid event interval has been passed.
     */

    private scheduleEventPublisherInterval(cronExpression: string): void {
        if (this._eventPublisherTask) {
            this._eventPublisherTask.destroy();
        }

        // validate
        if (!validateCronExpression(cronExpression)) {
            // invalid chron expression.
            throw new InvalidEventPublishIntervalException();
        }

        this._eventPublisherTask = scheduleTask(cronExpression, async () => {
            try {
                // publish the events.
                await this.eventStore().publishEvents();
            }
            catch(err) {
                // something went wrong broadcasting the events.
                await this.emit(new EventBroadcastFailed(err as Error));
            }
        });
    }
}