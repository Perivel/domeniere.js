"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleException = void 0;
const foundation_1 = require("@perivel/foundation");
/**
 * ModuleException
 */
class ModuleException extends foundation_1.BaseException {
    constructor(message = "Module Exception") {
        super(message);
    }
}
exports.ModuleException = ModuleException;
//# sourceMappingURL=module.exception.js.map