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
export class EventStream {
    constructor() {
        this.emitter = new EventEmitter();
        this._eventStore = new DefaultEventStore();
    }
    static instance() {
        if (!EventStream._instance) {
            EventStream._instance = new EventStream();
        }
        return EventStream._instance;
    }
    emit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.eventStore().store(event);
            }
            catch (err) {
            }
            yield this.emitter.emit(event);
        });
    }
    eventStore() {
        return this._eventStore;
    }
    setEventStore(eventStore) {
        this._eventStore = eventStore;
    }
    subscribe(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        const subscriberId = new SubscriberId(id);
        const subscriber = new Subscriber(subscriberId, eventName, priority, label, handler, stopPropogationOnError);
        this.emitter.addSubscriber(subscriber);
    }
}
