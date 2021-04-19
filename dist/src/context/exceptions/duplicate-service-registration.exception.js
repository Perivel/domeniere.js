"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateServiceRegistrationException = void 0;
const context_exception_1 = require("./context.exception");
/**
 * DuplicateServiceRegistrationException
 *
 * DuplicateServiceRegistrationException
 */
class DuplicateServiceRegistrationException extends context_exception_1.ContextException {
    constructor(message = "Duplicate Service Registration") {
        super(message);
    }
}
exports.DuplicateServiceRegistrationException = DuplicateServiceRegistrationException;
