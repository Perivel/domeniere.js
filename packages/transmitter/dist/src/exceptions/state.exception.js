"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateException = void 0;
const core_1 = require("@swindle/core");
/**
 * StateException
 *
 * A generate state exception.
 */
class StateException extends core_1.BaseException {
    constructor(message = "State Error") {
        super(message);
    }
}
exports.StateException = StateException;
//# sourceMappingURL=state.exception.js.map