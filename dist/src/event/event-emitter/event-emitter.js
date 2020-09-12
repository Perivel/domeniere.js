var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PriorityQueue } from "foundation";
import { EventAggregate } from "./event-aggregate..type";
export class EventEmitter {
    constructor(maxRetries = 3) {
        this.subscribers = new Array();
        this.maxRetries = maxRetries;
    }
    addSubscriber(subscriber) {
        if (subscriber && (!this.subscriberExists(subscriber))) {
            this.subscribers.push(subscriber);
        }
    }
    emit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = new PriorityQueue();
            const eventName = event.eventName();
            this.subscribers.forEach(sub => {
                if ((sub.eventName() === eventName) ||
                    (sub.eventName() === EventAggregate.Any.toString()) ||
                    ((event.isInternal()) && (sub.eventName() === EventAggregate.Internal.toString())) ||
                    ((event.isError()) && (sub.eventName() === EventAggregate.Error.toString()))) {
                    queue.enqueue(sub, sub.priority());
                }
            });
            yield Promise.all(queue.toArray().map((sub) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sub.handleEvent(event);
                }
                catch (error) {
                }
            })));
        });
    }
    removeSubscriber(suspect) {
        this.subscribers = this.subscribers.filter(subscriber => !subscriber.equals(suspect));
    }
    subscriberExists(suspect) {
        const foundSubscribers = this.subscribers.filter(subscription => suspect.equals(subscription));
        return foundSubscribers.length !== 0;
    }
}
