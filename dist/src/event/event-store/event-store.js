var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Queue } from "foundation";
import { EventStream } from "../event-stream/event-stream";
import { EventBroadcastFailed } from "../libevents/event-broadcast-failed.event";
import { EventStoreFailed } from "../libevents/event-store-failed.event";
import { StoredEvent } from "./stored-event";
export class EventStore {
    constructor() {
        this._storageQueue = new Queue();
        this._publishQueue = new Queue();
    }
    publishEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.boradcastEvents(this._publishQueue);
            }
            catch (error) {
                yield EventStream.instance().emit(new EventBroadcastFailed(error));
            }
        });
    }
    persistEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.saveEvents(this._storageQueue);
            }
            catch (err) {
                yield EventStream.instance().emit(new EventStoreFailed(err));
            }
        });
    }
    shouldBroadcastInternalEvents() {
        return false;
    }
    shouldSaveInternalEvents() {
        return false;
    }
    store(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!event.isInternal() || this.shouldSaveInternalEvents()) {
                const storedEvent = new StoredEvent(event.eventId().id(), event.eventName(), event.eventClassification(), event.eventVersion(), event.serialize(), event.occuredOn());
                this._storageQueue.enqueue(storedEvent);
                if ((event.shouldBeBroadcasted() && !event.isInternal()) || this.shouldBroadcastInternalEvents()) {
                    this._publishQueue.enqueue(event);
                }
            }
        });
    }
}
