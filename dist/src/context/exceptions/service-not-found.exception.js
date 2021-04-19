"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceNotFoundException = void 0;
const context_exception_1 = require("./context.exception");
/**
 * ServiceNotFoundException
 *
 * ServiceNotFoundException
 */
class ServiceNotFoundException extends context_exception_1.ContextException {
    constructor(message = "Service Not Found") {
        super(message);
    }
}
exports.ServiceNotFoundException = ServiceNotFoundException;
