"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateServiceRegistrationException = void 0;
const domain_exception_1 = require("./domain.exception");
/**
 * DuplicateServiceRegistrationException
 *
 * DuplicateServiceRegistrationException
 */
class DuplicateServiceRegistrationException extends domain_exception_1.DomainException {
    constructor(message = "Duplicate Service Registration") {
        super(message);
    }
}
exports.DuplicateServiceRegistrationException = DuplicateServiceRegistrationException;
