var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventEmitter } from "../event-emitter/event-emitter";
import { Subscriber } from "../subscriber/subscriber";
import { SubscriberId } from "../subscriber/subscriber-id";
import { DefaultEventStore } from "../event-store/default-event-store";
import { DefaultNetworkEventQueue } from "../../common/objects/default-network-event-queue";
import { EventStoreFailed } from "../libevents/event-store-failed.event";
import { EventStored } from "../libevents/event-stored.event";
import { UUID, Queue } from "foundation";
import { FrameworkEventHandlerPriority } from "../subscriber/framework-event-handler-priority.enum";
import { schedule as scheduleTask, validate as validateCronExpression } from 'node-cron';
export class EventStream {
    constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
        this._publicQueue = new DefaultNetworkEventQueue();
        this._publishQueue = new DefaultNetworkEventQueue();
        this._shouldSaveInternalEvents = false;
        this._backlogEventQueue = new Queue();
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
    emit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!event.isInternal() || this._shouldSaveInternalEvents) {
                    yield this.eventStore().store(event);
                    this._backlogEventQueue.enqueue(event);
                    yield EventStream.instance().emit(new EventStored(event));
                }
            }
            catch (err) {
                yield EventStream.instance().emit(new EventStoreFailed(event, err));
            }
            yield this.emitter.emit(event);
        });
    }
    eventStore() {
        return this._eventStore;
    }
    saveInternalEvents() {
        this._shouldSaveInternalEvents = true;
    }
    setEventStore(eventStore) {
        this._eventStore = eventStore;
    }
    setPublicQueue(queue) {
        this._publicQueue = queue;
    }
    setPublishQueue(queue) {
        this._publishQueue = queue;
    }
    subscribe(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        const subscriberId = new SubscriberId(id);
        const subscriber = new Subscriber(subscriberId, eventName, priority, label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
    registerInternalEventHandlers() {
        this.subscribe(UUID.V4().id(), EventStored.EventName(), Number(FrameworkEventHandlerPriority.VERY_HIGH), 'add-event-to-publish-queue', (event) => __awaiter(this, void 0, void 0, function* () {
            let eventToAdd = null;
            while (!this._backlogEventQueue.isEmpty()) {
                eventToAdd = this._backlogEventQueue.peek();
                yield this._publishQueue.enqueue(eventToAdd);
                this._backlogEventQueue.dequeue();
            }
        }), false);
    }
    scheduleEventPublisherInterval(cronExpression) {
        if (this._eventPublisherTask) {
            this._eventPublisherTask.destroy();
        }
        if (!validateCronExpression(cronExpression)) {
            throw new Error('Invalid Interval.');
        }
        this._eventPublisherTask = scheduleTask(cronExpression, () => __awaiter(this, void 0, void 0, function* () {
        }));
    }
}
