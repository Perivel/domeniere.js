import { CompositeSpecification } from "./composite-specification";
import { SpecificationInterface } from "./specification.interface";
export declare class OrSpecification extends CompositeSpecification implements SpecificationInterface {
    private readonly _left;
    private readonly _right;
    constructor(left: SpecificationInterface, right: SpecificationInterface);
    isSatisfiedBy(suspect: any): boolean;
}
//# sourceMappingURL=or-specification.d.ts.map