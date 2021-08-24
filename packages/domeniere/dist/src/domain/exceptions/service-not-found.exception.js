"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceNotFoundException = void 0;
const domain_exception_1 = require("./domain.exception");
/**
 * ServiceNotFoundException
 *
 * ServiceNotFoundException
 */
class ServiceNotFoundException extends domain_exception_1.DomainException {
    constructor(message = "Service Not Found") {
        super(message);
    }
}
exports.ServiceNotFoundException = ServiceNotFoundException;
//# sourceMappingURL=service-not-found.exception.js.map