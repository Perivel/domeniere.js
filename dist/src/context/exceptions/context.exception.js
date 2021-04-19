"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextException = void 0;
const foundation_1 = require("foundation");
/**
 * ContextException
 *
 * A generic context exception.
 */
class ContextException extends foundation_1.BaseException {
    constructor(message = "Context Error") {
        super(message);
    }
}
exports.ContextException = ContextException;
