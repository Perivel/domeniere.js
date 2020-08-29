import { CompositeSpecification } from "./composite-specification";
import { SpecificationInterface } from "./specification.interface";

/**
 * OrSpecification
 */

export class OrSpecification extends CompositeSpecification implements SpecificationInterface {

    private readonly _left: SpecificationInterface;
    private readonly _right: SpecificationInterface;

    constructor(left: SpecificationInterface, right: SpecificationInterface) {
        super();
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

    public isSatisfiedBy(suspect: any): boolean {
        if ((!this._left) || (!this._right)) {
            return false;
        }
        else {
            return this._left.isSatisfiedBy(suspect) || this._right.isSatisfiedBy(suspect);
        }
    }
}