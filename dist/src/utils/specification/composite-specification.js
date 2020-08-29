import { AndSpecification } from "./and-specification";
import { AndNotSpecification } from "./and-not-specification";
import { OrSpecification } from "./or-specification";
import { OrNotSpecification } from "./or-not-specification";
export class CompositeSpecification {
    constructor() { }
    and(other) {
        return new AndSpecification(this, other);
    }
    andNot(other) {
        return new AndNotSpecification(this, other);
    }
    or(other) {
        return new OrSpecification(this, other);
    }
    orNot(other) {
        return new OrNotSpecification(this, other);
    }
}
