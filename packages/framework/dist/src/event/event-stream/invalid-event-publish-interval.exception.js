"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEventPublishIntervalException = void 0;
const core_1 = require("@swindle/core");
class InvalidEventPublishIntervalException extends core_1.InvalidArgumentException {
    constructor(message = 'Invalid Event Broadcast Interval.') {
        super(message);
    }
}
exports.InvalidEventPublishIntervalException = InvalidEventPublishIntervalException;
//# sourceMappingURL=invalid-event-publish-interval.exception.js.map