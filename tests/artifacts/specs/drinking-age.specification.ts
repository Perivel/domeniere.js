import { CompositeSpecification } from "../../../fragment";


export class DrinkingAgeSpecification extends CompositeSpecification {


    constructor() {
        super();
    }

    public isSatisfiedBy(age: number): boolean {
        return age >= 21;
    }
}