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
}