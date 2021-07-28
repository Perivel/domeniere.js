"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreException = void 0;
const swindle_1 = require("swindle");
/**
 * EventStoreException
 *
 * A generic Event Store Exception
 */
class EventStoreException extends swindle_1.BaseException {
    constructor(message = "Event Store Error") {
        super(message);
    }
}
exports.EventStoreException = EventStoreException;
//# sourceMappingURL=event-store.exception.js.map