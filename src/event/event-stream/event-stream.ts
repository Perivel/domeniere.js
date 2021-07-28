import { EventStreamInterface } from "./event-stream.interface";
import { EventEmitter } from "../event-emitter/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { Subscriber } from "../subscriber/subscriber";
import { EventHandler } from "../subscriber/event-handler.type";
import { SubscriberId } from "../subscriber/subscriber-id";
import { DefaultEventStore } from "../event-store/default-event-store";
import { UUID } from "swindle";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { ScheduledTask } from 'node-cron';
import { EventAggregate } from "../event-emitter/event-aggregate..type";
import { EventStoreFailed } from "../libevents/event-store-failed.event";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventsPublished } from "../libevents/events-published.event";
import { TransmittedEvent } from "../event-store/transmitted-event";

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
    private _eventPublisherTask: ScheduledTask | null;

    constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
        this._eventPublisherTask = null;


        // Register internal event handlers.
        this.registerInternalEventHandlers();
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
            await this.emit(new EventStoreFailed(e));
        }
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

    public subscribe(eventName: string | EventAggregate, handler: EventHandler, priority: FrameworkEventHandlerPriority | DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = '', stopPropogationOnError: boolean = false): void {
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
        this.subscribe(EventAggregate.Any.toString(), async () => {
            try {
                await this.eventStore().persistEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await this.emit(new EventStoreFailed(err));
            }

        }, FrameworkEventHandlerPriority.HIGH, 'persist events', false);

        // register event to process braodcasted events.
        this.subscribe(EventsPublished.EventName(), async (event: DomainEvent) => {
            this.eventStore().processPublishedEvents();
        }, FrameworkEventHandlerPriority.LOW, 'Process published events', false);

        // Register a handler to automatically update the status of published events in storage.
        this.subscribe(EventsPublished.EventName(), async (event: DomainEvent) => {
            try {
                await this.eventStore().updatePublishedEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await this.emit(new EventStoreFailed(err));
            }

        }, FrameworkEventHandlerPriority.VERY_LOW, 'update events in storage.', false);
    }
}