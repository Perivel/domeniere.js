import { CompositeSpecification } from "./composite-specification";
export class OrNotSpecification extends CompositeSpecification {
    constructor(left, right) {
        super();
        this._left = left;
        this._right = right;
    }
    isSatisfiedBy(suspect) {
        if ((!this._left) || (!this._right)) {
            return false;
        }
        else {
            return this._left.isSatisfiedBy(suspect) || !this._right.isSatisfiedBy(suspect);
        }
    }
}
