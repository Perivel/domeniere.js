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
const domain_event_handler_priority_enum_1 = require("../subscriber/domain-event-handler-priority.enum");
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
     * publishEvents()
     *
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */
    async publishEvents() {
        await this.eventStore().publishEvents();
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
                await this.eventStore().publishEvents();
            }
            catch (err) {
                // something went wrong broadcasting the events.
                await this.emit(new event_module_1.EventBroadcastFailed(err));
            }
        });
    }
}
exports.EventStream = EventStream;
