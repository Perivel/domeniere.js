"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameSpecification = void 0;
const specification_1 = require("@swindle/specification");
/**
 * UsernameSpecification
 *
 * Registration specification for a username.
 */
class UsernameSpecification extends specification_1.CompositeSpecification {
    constructor() {
        super();
    }
    isSatisfiedBy(suspect) {
        const len = suspect.username().value().length;
        return (len > 0) && (len <= 60);
    }
}
exports.UsernameSpecification = UsernameSpecification;
