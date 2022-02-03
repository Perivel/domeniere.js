"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateBindingException = void 0;
const module_exception_1 = require("./module.exception");
/**
 * DuplicateBindingException
 */
class DuplicateBindingException extends module_exception_1.ModuleException {
    constructor(message = "Registration Not Found Exception") {
        super(message);
    }
}
exports.DuplicateBindingException = DuplicateBindingException;
//# sourceMappingURL=duplicate-binding.exception.js.map