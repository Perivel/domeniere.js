import { SpecificationInterface } from "./specification.interface";
import { AndSpecification } from "./and-specification";
import { AndNotSpecification } from "./and-not-specification";
import { OrSpecification } from "./or-specification";
import { OrNotSpecification } from "./or-not-specification";

/**
 * Specification
 *
 * Specification is the base specification.
 */

export abstract class CompositeSpecification implements SpecificationInterface {

    constructor() { }

    /**
     * isSatisfiedBy()
     * 
     * isSatisfiedBy() determines whether or not 
     * the suspect satisfies the specification.
     * 
     * @param suspect the suspect in question.
     */

    public abstract isSatisfiedBy(suspect: any): boolean;

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