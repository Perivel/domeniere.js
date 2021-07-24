"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrNotSpecification = void 0;
const and_not_specification_1 = require("./and-not-specification");
const and_specification_1 = require("./and-specification");
const or_specification_1 = require("./or-specification");
/**
 * OrNotSpecification
 */
class OrNotSpecification {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    /**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */
    isSatisfiedBy(suspect) {
        if ((!this._left) || (!this._right)) {
            return false;
        }
        else {
            return this._left.isSatisfiedBy(suspect) || !this._right.isSatisfiedBy(suspect);
        }
    }
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
        return new OrNotSpecification(this, other);
    }
}
exports.OrNotSpecification = OrNotSpecification;
//# sourceMappingURL=or-not-specification.js.map