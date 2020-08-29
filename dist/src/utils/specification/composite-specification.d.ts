import { SpecificationInterface } from "./specification.interface";
import { AndSpecification } from "./and-specification";
import { AndNotSpecification } from "./and-not-specification";
import { OrSpecification } from "./or-specification";
import { OrNotSpecification } from "./or-not-specification";
export declare abstract class CompositeSpecification implements SpecificationInterface {
    constructor();
    abstract isSatisfiedBy(suspect: any): boolean;
    and(other: SpecificationInterface): AndSpecification;
    andNot(other: SpecificationInterface): AndNotSpecification;
    or(other: SpecificationInterface): OrSpecification;
    orNot(other: SpecificationInterface): OrNotSpecification;
}
//# sourceMappingURL=composite-specification.d.ts.map