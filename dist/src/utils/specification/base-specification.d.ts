import { SpecificationInterface } from "./specification.interface";
export declare abstract class Specification implements SpecificationInterface {
    constructor();
    abstract isSatisfiedBy(suspect: any): boolean;
    and(other: SpecificationInterface): SpecificationInterface;
    andNot(other: SpecificationInterface): SpecificationInterface;
    or(other: SpecificationInterface): SpecificationInterface;
    orNot(other: SpecificationInterface): SpecificationInterface;
}
//# sourceMappingURL=base-specification.d.ts.map