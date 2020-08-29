import { CompositeSpecification } from "./composite-specification";
import { SpecificationInterface } from "./specification.interface";
export declare class AndSpecification extends CompositeSpecification implements SpecificationInterface {
    private readonly _left;
    private readonly _right;
    constructor(left: SpecificationInterface, right: SpecificationInterface);
    isSatisfiedBy(suspect: any): boolean;
}
//# sourceMappingURL=and-specification.d.ts.map