"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleException = void 0;
const swindle_1 = require("swindle");
/**
 * ModuleException
 */
class ModuleException extends swindle_1.BaseException {
    constructor(message = "Module Exception") {
        super(message);
    }
}
exports.ModuleException = ModuleException;
//# sourceMappingURL=module.exception.js.map