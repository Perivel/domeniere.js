"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const swindle_1 = require("swindle");
/**
 * DomainException
 *
 * A generic domain exception.
 */
class DomainException extends swindle_1.BaseException {
    constructor(message = "Domain Error") {
        super(message);
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map