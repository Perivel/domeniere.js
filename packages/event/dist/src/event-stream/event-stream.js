"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStream = void 0;
const event_emitter_1 = require("@swindle/event-emitter");
const event_store_exception_1 = require("./../eventstore/event-store.exception");
const domeniere_event_emitter_1 = require("../event-emitter/domeniere-event-emitter");
const default_event_store_1 = require("../eventstore/default-event-store");
const event_handler_failed_event_1 = require("../internal-events/event-handler-failed.event");
const event_store_failed_event_1 = require("../internal-events/event-store-failed.event");
const domain_event_handler_priority_enum_1 = require("./domain-event-handler-priority.enum");
const event_aggregate__type_1 = require("./event-aggregate..type");
/**
 * Event Stream
 *
 * Event Stream is the main Event Stream object responsible for emitting events.
 */
class EventStream {
    constructor(eventStore = new default_event_store_1.DefaultEventStore()) {
        this._eventStore = eventStore;
        this.emitter = new domeniere_event_emitter_1.DomeniereEventEmitter(
        // initial subscribers.
        [], 
        // this method gets executed before event handlers are executed.
        async (event, emitter) => {
            // save the event.
            try {
                // We persist all events except EventStoreFailedEvents, as it would not make sence to persist an error event 
                // in the same object that just failed and caused that error.
                const isEventStoreFailedEvent = event instanceof event_store_failed_event_1.EventStoreFailed;
                if (!isEventStoreFailedEvent) {
                    await this.eventStore().store(event);
                    await this.eventStore().persistEvents();
                }
            }
            catch (err) {
                // failed to store some or all the events.
                await emitter.emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, 
        // this method is executed after all handlers are executed.
        async (event, emitter) => {
            // process the published events.
            this.eventStore().processPublishedEvents();
            // update the published events.
            try {
                await this.eventStore().updatePublishedEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await emitter.emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, 
        // executed when the handler encounters an error
        async (event, error, sub, emitter) => {
            // emit a handler failed event when an event handler fails.
            await emitter.emit(new event_handler_failed_event_1.EventHandlerFailed(sub, event, error));
        });
        this._eventStoreUpdated = false;
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
        await this.emitter.emit(event);
    }
    /**
     * listSubscribers()
     *
     * lists the event subscribers.
     * @returns the list of event subscribers.
     */
    listSubscribers() {
        return this.emitter.subscriberList();
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
     * sets the event stream's internal event store.
     * @param eventStore the event store to set.
     * @param force whether or not to force setting the eventstore.
     * @throws EventStoreException when attempting to reset the event store, without explicitly forcing it.
     */
    setEventStore(eventStore, force = false) {
        if (!force && this._eventStoreUpdated) {
            throw new event_store_exception_1.EventStoreException('EventStore already previously set.');
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
    subscribe(event, handler, priority = domain_event_handler_priority_enum_1.DomainEventHandlerPriority.MEDIUM, label = "", stopPropogationOnError = false) {
        const subscriberId = event_emitter_1.SubscriberId.Generate();
        // if the event is an EventAggregate, we cast it to a string. Otherwise, it is some type of DomainEvent, in which case we call the EventName() static method.
        const eventName = Object.values(event_aggregate__type_1.EventAggregate).includes(event) ? event.toString() : event.EventName();
        // create the subscriber.
        const subscriber = new event_emitter_1.Subscriber(subscriberId, eventName.toString(), Number(priority), label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
}
exports.EventStream = EventStream;
//# sourceMappingURL=event-stream.js.map