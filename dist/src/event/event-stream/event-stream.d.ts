import { EventStreamInterface } from "./event-stream.interface";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { EventHandler } from "../subscriber/event-handler.type";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { EventAggregate } from "../event-emitter/event-aggregate..type";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
/**
 * Event Stream
 *
 * Event Stream is the main Event Stream object responsible for emitting events.
 */
export declare class EventStream implements EventStreamInterface {
    private static _instance;
    private readonly emitter;
    private _eventStore;
    private _eventPublisherTask;
    constructor();
    /**
     * publishEvents()
     *
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */
    publishEvents(): Promise<void>;
    /**
     * emit()
     *
     * emit() publishes a domain event.
     */
    emit(event: DomainEvent): Promise<void>;
    /**
     * eventStore()
     *
     * eventStore() gets the event store.
     */
    eventStore(): EventStore;
    /**
     * setEventStore()
     *
     * setEventStore() sets the event store.
     */
    setEventStore(eventStore: EventStore): void;
    /**
     * creates a subscriber for the event stream.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber. The higher  the priority, the earlier the handler will be executed.
     * @param label a label to give to the subscriber. This label is only for your own reference, hence it is optional and defaults to an empty string.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if the event propogation should stop when the subscriber handler encounters an error.
     */
    subscribe(eventName: string | EventAggregate, handler: EventHandler, priority?: FrameworkEventHandlerPriority | DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): void;
    /**
     * registerInternalHandlers()
     *
     * reigster internal handlers here.
     */
    private registerInternalEventHandlers;
    /**
     * Schedules the interval when events are to be published to the public queue.
     * @param cronExpression THe cron expression
     * @throws InvalidEventPublishIntercalException when an invalid event interval has been passed.
     */
    private scheduleEventPublisherInterval;
}
//# sourceMappingURL=event-stream.d.ts.map