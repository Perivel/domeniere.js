import { SpecificationInterface } from "./specification.interface";
/**
 * Specification
 *
 * Specification is the base specification.
 */
export declare abstract class CompositeSpecification implements SpecificationInterface {
    constructor();
    /**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or not
     * the suspect satisfies the specification.
     *
     * @param suspect the suspect in question.
     */
    abstract isSatisfiedBy(suspect: any): boolean;
    /**
     * and()
     * @param other the other specification
     */
    and(other: SpecificationInterface): SpecificationInterface;
    /**
     * andNot()
     * @param other the other specification.
     */
    andNot(other: SpecificationInterface): SpecificationInterface;
    /**
     * or()
     * @param other The other specification.
     */
    or(other: SpecificationInterface): SpecificationInterface;
    /**
     * orNot()
     * @param other the other specification.
     */
    orNot(other: SpecificationInterface): SpecificationInterface;
}
//# sourceMappingURL=composite-specification.d.ts.map