"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStream = void 0;
const event_emitter_1 = require("../event-emitter/event-emitter");
const subscriber_1 = require("../subscriber/subscriber");
const subscriber_id_1 = require("../subscriber/subscriber-id");
const default_event_store_1 = require("../event-store/default-event-store");
const foundation_1 = require("@perivel/foundation");
const framework_event_handler_priority_enum_1 = require("../subscriber/framework-event-handler-priority.enum");
const event_aggregate__type_1 = require("../event-emitter/event-aggregate..type");
const event_store_failed_event_1 = require("../libevents/event-store-failed.event");
const domain_event_handler_priority_enum_1 = require("../subscriber/domain-event-handler-priority.enum");
const events_published_event_1 = require("../libevents/events-published.event");
/**
 * Event Stream
 *
 * Event Stream is the main Event Stream object responsible for emitting events.
 */
class EventStream {
    constructor() {
        this.emitter = new event_emitter_1.EventEmitter();
        this._eventStore = new default_event_store_1.DefaultEventStore();
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
    async initializeEvents() {
        // load unpublished events.
        await this.eventStore().loadUnpublishedEvents();
        // process transmitted events.
        const lastEventDate = await this.eventStore().getDateOfLastEvent();
        const events = new Array();
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
        await Promise.all(sortedEvents.map(async (event) => {
            await this.emit(event);
        }));
    }
    /**
     * publishEvents()
     *
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */
    async publishEvents() {
        await this.eventStore().publishEvents();
    }
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param transmittedEvent the event to process.
     */
    async processTransmittedEvent(transmittedEvent) {
        try {
            const event = this.eventStore().mapTransmittedEventToDomainEvent(transmittedEvent);
            await this.emit(event);
        }
        catch (e) {
            await this.emit(new event_store_failed_event_1.EventStoreFailed(e));
        }
    }
    /**
     * emit()
     *
     * emit() publishes a domain event.
     */
    async emit(event) {
        await this.eventStore().store(event);
        await this.emitter.emit(event);
    }
    /**
     * eventStore()
     *
     * eventStore() gets the event store.
     */
    eventStore() {
        return this._eventStore;
    }
    /**
     * setEventStore()
     *
     * setEventStore() sets the event store.
     */
    setEventStore(eventStore) {
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
    subscribe(eventName, handler, priority = domain_event_handler_priority_enum_1.DomainEventHandlerPriority.MEDIUM, label = '', stopPropogationOnError = false) {
        const subscriberId = new subscriber_id_1.SubscriberId(foundation_1.UUID.V4().id());
        const subscriber = new subscriber_1.Subscriber(subscriberId, eventName.toString(), Number(priority), label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
    // helpers
    /**
     * registerInternalHandlers()
     *
     * reigster internal handlers here.
     */
    registerInternalEventHandlers() {
        // register a handler to automatically save events on any event.
        this.subscribe(event_aggregate__type_1.EventAggregate.Any.toString(), async () => {
            try {
                await this.eventStore().persistEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await this.emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, framework_event_handler_priority_enum_1.FrameworkEventHandlerPriority.HIGH, 'persist events', false);
        // register event to process braodcasted events.
        this.subscribe(events_published_event_1.EventsPublished.EventName(), async (event) => {
            this.eventStore().processPublishedEvents();
        }, framework_event_handler_priority_enum_1.FrameworkEventHandlerPriority.LOW, 'Process published events', false);
        // Register a handler to automatically update the status of published events in storage.
        this.subscribe(events_published_event_1.EventsPublished.EventName(), async (event) => {
            try {
                await this.eventStore().updatePublishedEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await this.emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, framework_event_handler_priority_enum_1.FrameworkEventHandlerPriority.VERY_LOW, 'update events in storage.', false);
    }
}
exports.EventStream = EventStream;
//# sourceMappingURL=event-stream.js.map