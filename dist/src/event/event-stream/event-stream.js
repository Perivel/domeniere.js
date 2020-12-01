"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStream = void 0;
const event_emitter_1 = require("../event-emitter/event-emitter");
const subscriber_1 = require("../subscriber/subscriber");
const subscriber_id_1 = require("../subscriber/subscriber-id");
const default_event_store_1 = require("../event-store/default-event-store");
const foundation_1 = require("foundation");
const framework_event_handler_priority_enum_1 = require("../subscriber/framework-event-handler-priority.enum");
const node_cron_1 = require("node-cron");
const event_aggregate__type_1 = require("../event-emitter/event-aggregate..type");
const event_store_failed_event_1 = require("../libevents/event-store-failed.event");
const event_module_1 = require("../event.module");
const invalid_event_publish_interval_exception_1 = require("./invalid-event-publish-interval.exception");
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
     * instance()
     *
     * instance() gets the instance of the event stream.
     */
    static instance() {
        if (!EventStream._instance) {
            EventStream._instance = new EventStream();
        }
        return EventStream._instance;
    }
    /**
     * PublishEvents()
     *
     * PublishEvents() publishes (or broadcasts) all unpublished events.
     */
    static async PublishEvents() {
        await EventStream
            .instance()
            .eventStore()
            .publishEvents();
    }
    /**
     * PublishEventsWithinInterval()
     * @param interval The interval in minutes of when events should be broadcasted.
     * @throws OutOfBoundsException when the interval is out of bounds.
     */
    static PublishEventsWithinInterval(interval) {
        if ((interval < 1) || (interval > 59)) {
            throw new foundation_1.OutOfBoundsException('Interval must be between 1 and 59 minutes.');
        }
        EventStream.instance().scheduleEventPublisherInterval(`*/${interval} * * * *`);
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
     * @param id The id of the subscriber.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if the event propogation should stop when the subscriber handler encounters an error.
     */
    subscribe(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        const subscriberId = new subscriber_id_1.SubscriberId(id);
        const subscriber = new subscriber_1.Subscriber(subscriberId, eventName, priority, label, handler, stopPropogationOnError);
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
        this.subscribe(foundation_1.UUID.V4().id(), event_aggregate__type_1.EventAggregate.Any.toString(), framework_event_handler_priority_enum_1.FrameworkEventHandlerPriority.HIGH, 'persist events', async () => {
            try {
                await EventStream.instance().eventStore().persistEvents();
            }
            catch (err) {
                // failed to store some or all the events.
                await EventStream.instance().emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, false);
    }
    /**
     * Schedules the interval when events are to be published to the public queue.
     * @param cronExpression THe cron expression
     * @throws InvalidEventPublishIntercalException when an invalid event interval has been passed.
     */
    scheduleEventPublisherInterval(cronExpression) {
        if (this._eventPublisherTask) {
            this._eventPublisherTask.destroy();
        }
        // validate
        if (!node_cron_1.validate(cronExpression)) {
            // invalid chron expression.
            throw new invalid_event_publish_interval_exception_1.InvalidEventPublishIntervalException();
        }
        this._eventPublisherTask = node_cron_1.schedule(cronExpression, async () => {
            try {
                // publish the events.
                await EventStream
                    .instance()
                    .eventStore()
                    .publishEvents();
            }
            catch (err) {
                // something went wrong broadcasting the events.
                await EventStream.instance().emit(new event_module_1.EventBroadcastFailed(err));
            }
        });
    }
}
exports.EventStream = EventStream;
