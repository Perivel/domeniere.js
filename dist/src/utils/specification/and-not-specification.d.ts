import { SpecificationInterface } from "./specification.interface";
export declare class AndNotSpecification implements SpecificationInterface {
    private readonly _left;
    private readonly _right;
    constructor(left: SpecificationInterface, right: SpecificationInterface);
    isSatisfiedBy(suspect: any): boolean;
    and(other: SpecificationInterface): SpecificationInterface;
    andNot(other: SpecificationInterface): SpecificationInterface;
    or(other: SpecificationInterface): SpecificationInterface;
    orNot(other: SpecificationInterface): SpecificationInterface;
}
//# sourceMappingURL=and-not-specification.d.ts.map