

export interface SpecificationInterface {
    /**
     * isSatisfiedBy()
     * 
     * isSatisfiedBy() determines whether or not 
     * the suspect satisfies the specification.
     * 
     * @param suspect the suspect in question.
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

    orNot(other: SpecificationInterface): SpecificationInterface
}