import { CompositeSpecification } from '../../../fragment';

export class LegalAgeSpecification extends CompositeSpecification {

    constructor() {
        super();
    }

    public isSatisfiedBy(age: number): boolean {
        return age >= 18;
    }
}