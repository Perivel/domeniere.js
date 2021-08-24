"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleException = void 0;
const core_1 = require("@swindle/core");
/**
 * ModuleException
 */
class ModuleException extends core_1.BaseException {
    constructor(message = "Module Exception") {
        super(message);
    }
}
exports.ModuleException = ModuleException;
//# sourceMappingURL=module.exception.js.map