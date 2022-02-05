import { CompositeSpecification } from '@swindle/specification';
import { AccountRegistration } from '../../values/values.well';

/**
 * AgeSpecification
 * 
 * AAge requirements for account registrants.
 */

export class AgeSpecification extends CompositeSpecification {

    constructor() {
        super();
    }

    /**
     * isSatisfiedBy()
     * @param suspect the registratin to test.
     * @returns TRUE if the registrant meets the age requirements. FALSE otherwise.
     */

    public isSatisfiedBy(suspect: AccountRegistration): boolean {
        return suspect.age() >= 13;
    }
}