"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSpecification = void 0;
const specification_1 = require("@swindle/specification");
/**
 * TagSpecification
 *
 * Tag requirements for account registrants.
 */
class TagSpecification extends specification_1.CompositeSpecification {
    constructor() {
        super();
    }
    isSatisfiedBy(suspect) {
        const length = suspect.tag().value().substring(1).length;
        return (length > 0) && (length <= 30);
    }
}
exports.TagSpecification = TagSpecification;
