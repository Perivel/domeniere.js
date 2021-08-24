import { CompositeSpecification } from "../../../src/utils/specification/composite-specification";


export class DrinkingAgeSpecification extends CompositeSpecification {


    constructor() {
        super();
    }

    public isSatisfiedBy(age: number): boolean {
        return age >= 21;
    }
}