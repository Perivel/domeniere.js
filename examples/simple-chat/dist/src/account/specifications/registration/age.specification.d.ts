import { CompositeSpecification } from '@swindle/specification';
import { AccountRegistration } from '../../values/values.well';
/**
 * AgeSpecification
 *
 * AAge requirements for account registrants.
 */
export declare class AgeSpecification extends CompositeSpecification {
    constructor();
    /**
     * isSatisfiedBy()
     * @param suspect the registratin to test.
     * @returns TRUE if the registrant meets the age requirements. FALSE otherwise.
     */
    isSatisfiedBy(suspect: AccountRegistration): boolean;
}
//# sourceMappingURL=age.specification.d.ts.map