import { AndNotSpecification } from "./and-not-specification";
import { OrNotSpecification } from "./or-not-specification";
import { OrSpecification } from "./or-specification";
export class AndSpecification {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    isSatisfiedBy(suspect) {
        if ((!this._left) || (!this._right)) {
            return false;
        }
        else {
            return this._left.isSatisfiedBy(suspect) && this._right.isSatisfiedBy(suspect);
        }
    }
    and(other) {
        return new AndSpecification(this, other);
    }
    andNot(other) {
        return new AndNotSpecification(this, other);
    }
    or(other) {
        return new OrSpecification(this, other);
    }
    orNot(other) {
        return new OrNotSpecification(this, other);
    }
}
