import { EventStreamInterface } from "./event-stream.interface";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { EventHandler } from "../subscriber/event-handler.type";
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
    private constructor();
    /**
     * instance()
     *
     * instance() gets the instance of the event stream.
     */
    static instance(): EventStream;
    /**
     * PublishEvents()
     *
     * PublishEvents() publishes (or broadcasts) all unpublished events.
     */
    static PublishEvents(): Promise<void>;
    /**
     * PublishEventsWithinInterval()
     * @param interval The interval in minutes of when events should be broadcasted.
     * @throws OutOfBoundsException when the interval is out of bounds.
     */
    static PublishEventsWithinInterval(interval: number): void;
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
     * @param id The id of the subscriber.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if the event propogation should stop when the subscriber handler encounters an error.
     */
    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError?: boolean): void;
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