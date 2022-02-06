"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeSpecification = void 0;
const specification_1 = require("@swindle/specification");
/**
 * AgeSpecification
 *
 * AAge requirements for account registrants.
 */
class AgeSpecification extends specification_1.CompositeSpecification {
    constructor() {
        super();
    }
    /**
     * isSatisfiedBy()
     * @param suspect the registratin to test.
     * @returns TRUE if the registrant meets the age requirements. FALSE otherwise.
     */
    isSatisfiedBy(suspect) {
        return suspect.age() >= 13;
    }
}
exports.AgeSpecification = AgeSpecification;
