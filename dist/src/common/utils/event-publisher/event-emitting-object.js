"use strict";
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
