
import { AndNotSpecification } from "./and-not-specification";
import { OrNotSpecification } from "./or-not-specification";
import { OrSpecification } from "./or-specification";
import { SpecificationInterface } from "./specification.interface";

/**
 * AndSpecification
 */

export class AndSpecification implements SpecificationInterface {

    private readonly _left: SpecificationInterface;
    private readonly _right: SpecificationInterface;

    constructor(left: SpecificationInterface, right: SpecificationInterface) {
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
            return this._left.isSatisfiedBy(suspect) && this._right.isSatisfiedBy(suspect);
        }
    }

    /**
     * and()
     * @param other the other specification
     */

    public and(other: SpecificationInterface): SpecificationInterface {
        return new AndSpecification(this, other);
    }

    /**
     * andNot()
     * @param other the other specification.
     */

    public andNot(other: SpecificationInterface): SpecificationInterface {
        return new AndNotSpecification(this, other);
    }

    /**
     * or()
     * @param other The other specification.
     */

    public or(other: SpecificationInterface): SpecificationInterface {
        return new OrSpecification(this, other);
    }

    /**
     * orNot()
     * @param other the other specification.
     */

    public orNot(other: SpecificationInterface): SpecificationInterface {
        return new OrNotSpecification(this, other);
    }
}