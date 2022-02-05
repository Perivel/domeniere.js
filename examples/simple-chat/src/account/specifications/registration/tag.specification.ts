import { CompositeSpecification } from '@swindle/specification';
import { MethodUndefinedException } from '@swindle/core';
import { AccountRegistration } from '../../values/values.well';

/**
 * TagSpecification
 * 
 * Tag requirements for account registrants.
 */

export class TagSpecification extends CompositeSpecification {

    constructor() {
        super();
    }

    public isSatisfiedBy(suspect: AccountRegistration): boolean {
        const length = suspect.tag().value().substring(1).length;
        return (length > 0) && (length <= 30);
    }
}