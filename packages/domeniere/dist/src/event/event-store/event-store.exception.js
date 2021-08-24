"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreException = void 0;
const core_1 = require("@swindle/core");
/**
 * EventStoreException
 *
 * A generic Event Store Exception
 */
class EventStoreException extends core_1.BaseException {
    constructor(message = "Event Store Error") {
        super(message);
    }
}
exports.EventStoreException = EventStoreException;
//# sourceMappingURL=event-store.exception.js.map