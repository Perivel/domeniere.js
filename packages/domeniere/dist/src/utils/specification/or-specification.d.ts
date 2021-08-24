import { SpecificationInterface } from "./specification.interface";
/**
 * OrSpecification
 */
export declare class OrSpecification implements SpecificationInterface {
    private readonly _left;
    private readonly _right;
    constructor(left: SpecificationInterface, right: SpecificationInterface);
    /**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */
    isSatisfiedBy(suspect: any): boolean;
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
//# sourceMappingURL=or-specification.d.ts.map