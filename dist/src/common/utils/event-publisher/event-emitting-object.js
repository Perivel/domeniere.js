"use strict";
/**
 * Event Publisher
 *
 * EventPublisher is the base class for an object that is able to publish events.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmittingObject = void 0;
const event_module_1 = require("../../../event/event.module");
class EventEmittingObject {
    constructor() { }
    async emit(event) {
        await event_module_1.EventStream.instance().emit(event);
    }
}
exports.EventEmittingObject = EventEmittingObject;
