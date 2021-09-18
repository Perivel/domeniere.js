import { Type } from "@swindle/core";
import {
    EventHandler,
    Subscriber, 
    SubscriberId 
} from "@swindle/event-emitter";
import { EventStoreException } from "../..";
import { DomainEvent } from "../domain-event/domain-event";
import { DomeniereEventEmitter } from "../event-emitter/domeniere-event-emitter";
import { DefaultEventStore } from "../eventstore/default-event-store";
import { EventStore } from "../eventstore/event-store";
import { TransmittedEvent } from "../eventstore/transmitted-event";
import { EventHandlerFailed } from "../internal-events/event-handler-failed.event";
import { EventStoreFailed } from "../internal-events/event-store-failed.event";
import { DomainEventHandlerPriority } from "./domain-event-handler-priority.enum";
import { DomainEventHandler } from "./domain-event-handler.type";
import { EventAggregate } from "./event-aggregate..type";
import { EventStreamInterface } from "./event-stream.interface";

/**
 * Event Stream
 * 
 * Event Stream is the main Event Stream object responsible for emitting events.
 */

export class EventStream implements EventStreamInterface {

    // The event publisher.
    private readonly emitter: DomeniereEventEmitter;

    // event store
    private _eventStore: EventStore;
    private _eventStoreUpdated: boolean;

    constructor(eventStore: EventStore = new DefaultEventStore()) {
        this._eventStore = eventStore;
        this.emitter = new DomeniereEventEmitter(
            // initial subscribers.
            [],
            // this method gets executed before event handlers are executed.
            async (event, emitter): Promise<void> => {
                // save the event.
                try {
                    await this.eventStore().store(event as DomainEvent);
                    await this.eventStore().persistEvents();
                }
                catch (err) {
                    // failed to store some or all the events.
                    await emitter.emit(new EventStoreFailed(err as Error));
                }
            },

            // this method is executed after all handlers are executed.
            async (event, emitter): Promise<void> => {
                // process the published events.
                this.eventStore().processPublishedEvents();

                // update the published events.
                try {
                    await this.eventStore().updatePublishedEvents();
                }
                catch (err) {
                    // failed to store some or all the events.
                    await emitter.emit(new EventStoreFailed(err as Error));
                }
            },

            // executed when the handler encounters an error
            async (event, error, sub, emitter): Promise<void> => {
                // emit a handler failed event when an event handler fails.
                await emitter.emit(new EventHandlerFailed(sub, event as DomainEvent, error));
            }
        );
        this._eventStoreUpdated = false;
    }

    /**
     * initializeEvents()
     * 
     * initializes the state of the event stream.
     * @throws EventStoreException when there is an error loading unpublished events from the event store.
     */

    public async initializeEvents(): Promise<void> {
        // load unpublished events.
        await this.eventStore().loadUnpublishedEvents();

        // process transmitted events.
        const lastEventDate = await this.eventStore().getDateOfLastEvent();
        const events = new Array<DomainEvent>();

        if (lastEventDate) {
            const transmittedEvents = await this.eventStore().getTransmittedEventsSince(lastEventDate);
            const foreignEvents = transmittedEvents.map(event => {
                return this.eventStore().mapTransmittedEventToDomainEvent(event);
            });
            events.push(...foreignEvents);
        }

        // sort the events.
        const sortedEvents = events.sort((a, b) => {
            if (a.occuredOn().isBefore(b.occuredOn())) {
                // a came before b
                return -1;
            }
            else if (b.occuredOn().isBefore(a.occuredOn())) {
                // b came before a
                return 1;
            }
            else {
                return 0;
            }
        });

        // emit all the events
        await Promise.all(sortedEvents.map(async event => {
            await this.emit(event);
        }));
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
     * processTransmittedEvent()
     * 
     * processes a transmitted event.
     * @param transmittedEvent the event to process.
     */

    public async processTransmittedEvent(transmittedEvent: TransmittedEvent): Promise<void> {

        try {
            const event = this.eventStore().mapTransmittedEventToDomainEvent(transmittedEvent);
            await this.emit(event);
        }
        catch (e) {
            await this.emit(new EventStoreFailed(e as Error));
        }
    }

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     */

    public async emit(event: DomainEvent): Promise<void> {
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
     * sets the event stream's internal event store.
     * @param eventStore the event store to set.
     * @param force whether or not to force setting the eventstore.
     * @throws EventStoreException when attempting to reset the event store, without explicitly forcing it.
     */

    public setEventStore(eventStore: EventStore, force: boolean = false): void {
        if (!force && this._eventStoreUpdated) {
            throw new EventStoreException('EventStore already previously set.');
        }
        this._eventStore = eventStore;
        this._eventStoreUpdated = true;
    }

    /**
     * creates a subscriber for the event stream.
     * @param event The event to listen for..
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if event propogation should stop if the handler encounters an error.
     */

    subscribe<T extends DomainEvent>(event: Type<T>|EventAggregate, handler: DomainEventHandler<T>, priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = "", stopPropogationOnError: boolean = false): void {
        const subscriberId = SubscriberId.Generate();
        
        // if the event is an EventAggregate, we cast it to a string. Otherwise, it is some type of DomainEvent, in which case we call the EventName() static method.
        const eventName = Object.values(EventAggregate).includes(event as EventAggregate) ? event.toString() : (event.constructor as any).EventName();

        // create the subscriber.
        const subscriber = new Subscriber(subscriberId, eventName.toString(), Number(priority), label, handler as EventHandler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
}