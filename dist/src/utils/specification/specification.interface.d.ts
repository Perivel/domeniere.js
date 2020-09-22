export interface SpecificationInterface {
    isSatisfiedBy(suspect: any): boolean;
    and(other: SpecificationInterface): SpecificationInterface;
    andNot(other: SpecificationInterface): SpecificationInterface;
    or(other: SpecificationInterface): SpecificationInterface;
    orNot(other: SpecificationInterface): SpecificationInterface;
}
//# sourceMappingURL=specification.interface.d.ts.map