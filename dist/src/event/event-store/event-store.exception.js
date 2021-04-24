"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreException = void 0;
const foundation_1 = require("@perivel/foundation");
/**
 * EventStoreException
 *
 * A generic Event Store Exception
 */
class EventStoreException extends foundation_1.BaseException {
    constructor(message = "Event Store Error") {
        super(message);
    }
}
exports.EventStoreException = EventStoreException;
