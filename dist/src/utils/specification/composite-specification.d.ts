import { SpecificationInterface } from "./specification.interface";
export declare abstract class CompositeSpecification implements SpecificationInterface {
    constructor();
    abstract isSatisfiedBy(suspect: any): boolean;
    and(other: SpecificationInterface): SpecificationInterface;
    andNot(other: SpecificationInterface): SpecificationInterface;
    or(other: SpecificationInterface): SpecificationInterface;
    orNot(other: SpecificationInterface): SpecificationInterface;
}
//# sourceMappingURL=composite-specification.d.ts.map