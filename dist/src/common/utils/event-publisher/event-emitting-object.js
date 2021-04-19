"use strict";
/**
 * Event Publisher
 *
 * EventPublisher is the base class for an object that is able to publish events.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmittingObject = void 0;
const domain_module_1 = require("../../../domain/domain.module");
class EventEmittingObject {
    constructor() { }
    async emit(event) {
        await domain_module_1.Domain.EventStream().emit(event);
    }
}
exports.EventEmittingObject = EventEmittingObject;
