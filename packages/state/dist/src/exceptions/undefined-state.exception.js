"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndefinedStateException = void 0;
const state_exception_1 = require("./state.exception");
/**
 * UndefinedStateException
 *
 * An exception indicating some state value is not defined.
 */
class UndefinedStateException extends state_exception_1.StateException {
    constructor(message = "Undefined State") {
        super(message);
    }
}
exports.UndefinedStateException = UndefinedStateException;
//# sourceMappingURL=undefined-state.exception.js.map