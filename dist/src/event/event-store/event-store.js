"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const foundation_1 = require("foundation");
const stored_event_1 = require("./stored-event");
class EventStore {
    constructor() {
        this._storageQueue = new foundation_1.Queue();
        this._publishQueue = new foundation_1.Queue();
    }
    async publishEvents() {
        if (!this._publishQueue.isEmpty()) {
            try {
                await this.boradcastEvents(this._publishQueue);
            }
            catch (error) {
                throw error;
                ;
            }
        }
    }
    async persistEvents() {
        if (!this._storageQueue.isEmpty()) {
            try {
                await this.saveEvents(this._storageQueue);
            }
            catch (err) {
                throw err;
            }
        }
    }
    shouldBroadcastInternalEvents() {
        return false;
    }
    shouldSaveInternalEvents() {
        return false;
    }
    async store(event) {
        if (!event.isInternal() || this.shouldSaveInternalEvents()) {
            const storedEvent = new stored_event_1.StoredEvent(event.eventId().id(), event.eventName(), event.eventClassification(), event.eventVersion(), event.serialize(), event.occuredOn());
            this._storageQueue.enqueue(storedEvent);
            if ((event.shouldBeBroadcasted() && !event.isInternal()) || this.shouldBroadcastInternalEvents()) {
                this._publishQueue.enqueue(event);
            }
        }
    }
}
exports.EventStore = EventStore;
