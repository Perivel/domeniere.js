import { CompositeSpecification } from '@swindle/specification';
import { MethodUndefinedException } from '@swindle/core';
import { AccountRegistration } from '../../values/values.well';

/**
 * UsernameSpecification
 * 
 * Registration specification for a username.
 */

export class UsernameSpecification extends CompositeSpecification {

    constructor() {
        super();
    }

    public isSatisfiedBy(suspect: AccountRegistration): boolean {
        const len = suspect.username().value().length;
        return (len > 0) && (len <= 60);
    }
}