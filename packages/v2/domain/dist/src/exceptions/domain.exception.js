"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const core_1 = require("@swindle/core");
/**
 * DomainException
 *
 * A generic domain exception.
 */
class DomainException extends core_1.BaseException {
    constructor(message = "Domain Error") {
        super(message);
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map