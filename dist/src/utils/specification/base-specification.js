import { AndNotSpecification } from "./and-not-specification";
import { AndSpecification } from "./and-specification";
import { OrNotSpecification } from "./or-not-specification";
import { OrSpecification } from "./or-specification";
export class Specification {
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
