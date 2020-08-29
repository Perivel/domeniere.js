import { CompositeSpecification } from "./composite-specification";
import { SpecificationInterface } from "./specification.interface";
export declare class OrNotSpecification extends CompositeSpecification implements SpecificationInterface {
    private readonly _left;
    private readonly _right;
    constructor(left: SpecificationInterface, right: SpecificationInterface);
    isSatisfiedBy(suspect: any): boolean;
}
//# sourceMappingURL=or-not-specification.d.ts.map