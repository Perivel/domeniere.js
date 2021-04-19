"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const foundation_1 = require("foundation");
/**
 * DomainException
 *
 * A generic domain exception.
 */
class DomainException extends foundation_1.BaseException {
    constructor(message = "Domain Error") {
        super(message);
    }
}
exports.DomainException = DomainException;