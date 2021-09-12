import { Type } from "@swindle/core";
import { EventHandler } from "@swindle/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../eventstore/event-store";
import { TransmittedEvent } from "../eventstore/transmitted-event";
import { DomainEventHandlerPriority } from "./domain-event-handler-priority.enum";
import { EventAggregate } from "./event-aggregate..type";
import { EventStreamInterface } from "./event-stream.interface";
/**
 * Event Stream
 *
 * Event Stream is the main Event Stream object responsible for emitting events.
 */
export declare class EventStream implements EventStreamInterface {
    private readonly emitter;
    private _eventStore;
    constructor(eventStore?: EventStore);
    /**
     * initializeEvents()
     *
     * initializes the state of the event stream.
     * @throws EventStoreException when there is an error loading unpublished events from the event store.
     */
    initializeEvents(): Promise<void>;
    /**
     * publishEvents()
     *
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */
    publishEvents(): Promise<void>;
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param transmittedEvent the event to process.
     */
    processTransmittedEvent(transmittedEvent: TransmittedEvent): Promise<void>;
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
     * creates a subscriber for the event stream.
     * @param event The event to listen for..
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if event propogation should stop if the handler encounters an error.
     */
    subscribe<T extends DomainEvent>(event: Type<T> | EventAggregate, handler: EventHandler, priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): void;
}
//# sourceMappingURL=event-stream.d.ts.map