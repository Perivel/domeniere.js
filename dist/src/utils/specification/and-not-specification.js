"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndNotSpecification = void 0;
const and_specification_1 = require("./and-specification");
const or_not_specification_1 = require("./or-not-specification");
const or_specification_1 = require("./or-specification");
class AndNotSpecification {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    isSatisfiedBy(suspect) {
        if ((!this._left) || (!this._right)) {
            return false;
        }
        else {
            return this._left.isSatisfiedBy(suspect) && !this._right.isSatisfiedBy(suspect);
        }
    }
    and(other) {
        return new and_specification_1.AndSpecification(this, other);
    }
    andNot(other) {
        return new AndNotSpecification(this, other);
    }
    or(other) {
        return new or_specification_1.OrSpecification(this, other);
    }
    orNot(other) {
        return new or_not_specification_1.OrNotSpecification(this, other);
    }
}
exports.AndNotSpecification = AndNotSpecification;
