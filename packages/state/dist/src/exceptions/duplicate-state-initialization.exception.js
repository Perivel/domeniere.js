"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateStateInitializationException = void 0;
const state_exception_1 = require("./state.exception");
class DuplicateStateInitializationException extends state_exception_1.StateException {
    constructor(message = "Duplicate State Initialization Error") {
        super(message);
    }
}
exports.DuplicateStateInitializationException = DuplicateStateInitializationException;
//# sourceMappingURL=duplicate-state-initialization.exception.js.map