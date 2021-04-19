import { EventHandler } from "../subscriber/event-handler.type";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { EventStore } from "../event-store/event-store";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventAggregate } from "../event-emitter/event-aggregate..type";
/**
 * EventStreamInterface
 *
 * EventStreamInterface specifies the operations for an event stream
 */
export interface EventStreamInterface {
    /**
     * emit()
     *
     * emit() publishes a domain event.
     */
    emit(event: DomainEventInterface): Promise<void>;
    /**
     * eventStore()
     *
     * eventStore() gets the event store.
     */
    eventStore(): EventStore;
    /**
     * publishEvents()
     *
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */
    publishEvents(): Promise<void>;
    /**
     * setEventStore()
     *
     * setEventStore() sets the event store.
     */
    setEventStore(eventStore: EventStore): void;
    /**
     * creates a subscriber for the event stream.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if event propogation should stop if the handler encounters an error.
     */
    subscribe(eventName: string | EventAggregate, handler: EventHandler, priority: FrameworkEventHandlerPriority | DomainEventHandlerPriority, label: string, stopPropogationOnError: boolean): void;
}
//# sourceMappingURL=event-stream.interface.d.ts.map