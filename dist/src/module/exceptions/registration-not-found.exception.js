"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationNotFoundException = void 0;
const module_exception_1 = require("./module.exception");
/**
 * RegistrationNotFoundException
 */
class RegistrationNotFoundException extends module_exception_1.ModuleException {
    constructor(message = "Registration Not Found Exception") {
        super(message);
    }
}
exports.RegistrationNotFoundException = RegistrationNotFoundException;
