"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEventPublishIntervalException = void 0;
const foundation_1 = require("foundation");
class InvalidEventPublishIntervalException extends foundation_1.InvalidArgumentException {
    constructor(message = 'Invalid Event Broadcast Interval.') {
        super(message);
    }
}
exports.InvalidEventPublishIntervalException = InvalidEventPublishIntervalException;
