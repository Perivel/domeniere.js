import { Value } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { Tag, Username } from '../values.well';
import { AccountRegistrationInterface } from './account-registration.interface';
/**
 * AccountRegistration
 *
 * An account registration.
 */
export declare class AccountRegistration extends Value implements AccountRegistrationInterface {
    private readonly _dob;
    private readonly _tag;
    private readonly _username;
    constructor(username: Username, tag: Tag, dob: DateTime);
    /**
     * age()
     *
     * gets the age of the registrant.
     */
    age(): number;
    /**
     * dob()
     *
     * gets the date of birth.
     */
    dob(): DateTime;
    equals(suspect: any): boolean;
    serialize(): string;
    /**
     * tag()
     *
     * gets the tag.
     */
    tag(): Tag;
    /**
     * username()
     *
     * gets the username.
     */
    username(): Username;
}
//# sourceMappingURL=account-registration.d.ts.map