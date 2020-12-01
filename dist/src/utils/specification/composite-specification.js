"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeSpecification = void 0;
const and_specification_1 = require("./and-specification");
const and_not_specification_1 = require("./and-not-specification");
const or_specification_1 = require("./or-specification");
const or_not_specification_1 = require("./or-not-specification");
/**
 * Specification
 *
 * Specification is the base specification.
 */
class CompositeSpecification {
    constructor() { }
    /**
     * and()
     * @param other the other specification
     */
    and(other) {
        return new and_specification_1.AndSpecification(this, other);
    }
    /**
     * andNot()
     * @param other the other specification.
     */
    andNot(other) {
        return new and_not_specification_1.AndNotSpecification(this, other);
    }
    /**
     * or()
     * @param other The other specification.
     */
    or(other) {
        return new or_specification_1.OrSpecification(this, other);
    }
    /**
     * orNot()
     * @param other the other specification.
     */
    orNot(other) {
        return new or_not_specification_1.OrNotSpecification(this, other);
    }
}
exports.CompositeSpecification = CompositeSpecification;
