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
class EventStream {
    constructor() {
        this.emitter = new event_emitter_1.EventEmitter();
        this._eventStore = new default_event_store_1.DefaultEventStore();
        this._eventPublisherTask = null;
        this.registerInternalEventHandlers();
    }
    static instance() {
        if (!EventStream._instance) {
            EventStream._instance = new EventStream();
        }
        return EventStream._instance;
    }
    static PublishEventsWithinInterval(interval) {
        if ((interval < 1) || (interval > 59)) {
            throw new Error('out of range.');
        }
        EventStream.instance().scheduleEventPublisherInterval(`*/${interval} * * * *`);
    }
    async emit(event) {
        this.eventStore().store(event);
        await this.emitter.emit(event);
    }
    eventStore() {
        return this._eventStore;
    }
    setEventStore(eventStore) {
        this._eventStore = eventStore;
    }
    subscribe(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        const subscriberId = new subscriber_id_1.SubscriberId(id);
        const subscriber = new subscriber_1.Subscriber(subscriberId, eventName, priority, label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
    registerInternalEventHandlers() {
        this.subscribe(foundation_1.UUID.V4().id(), event_aggregate__type_1.EventAggregate.Any.toString(), framework_event_handler_priority_enum_1.FrameworkEventHandlerPriority.HIGH, 'persist events', async () => {
            try {
                await EventStream.instance().eventStore().persistEvents();
            }
            catch (err) {
                await EventStream.instance().emit(new event_store_failed_event_1.EventStoreFailed(err));
            }
        }, false);
    }
    scheduleEventPublisherInterval(cronExpression) {
        if (this._eventPublisherTask) {
            this._eventPublisherTask.destroy();
        }
        if (!node_cron_1.validate(cronExpression)) {
            throw new Error('Invalid Interval.');
        }
        this._eventPublisherTask = node_cron_1.schedule(cronExpression, async () => {
            try {
                await EventStream
                    .instance()
                    .eventStore()
                    .publishEvents();
            }
            catch (err) {
                await EventStream.instance().emit(new event_module_1.EventBroadcastFailed(err));
            }
        });
    }
}
exports.EventStream = EventStream;
