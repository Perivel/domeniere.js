import { Value } from '@domeniere/framework';
import { DateTime, Duration, MethodUndefinedException } from '@swindle/core';
import { Tag, Username } from '../values.well';
import { AccountRegistrationInterface } from './account-registration.interface';

/**
 * AccountRegistration
 * 
 * An account registration.
 */

export class AccountRegistration extends Value implements AccountRegistrationInterface {

    private readonly _dob: DateTime;
    private readonly _tag: Tag;
    private readonly _username: Username;

    constructor(
        username: Username,
        tag: Tag,
        dob: DateTime,
    ) {
        super();
        this._dob = dob;
        this._tag = tag;
        this._username = username;
    }

    /**
     * age()
     * 
     * gets the age of the registrant.
     */

    public age(): number {
        const now = DateTime.Now();
        const dobInYears = Math.floor(Duration.FromDateTimeDifference(now, this.dob().toUtc()).inYears());
        return Math.abs(dobInYears);
    }

    /**
     * dob()
     * 
     * gets the date of birth.
     */

    public dob(): DateTime {
        return this._dob;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof AccountRegistration) {
            const other = suspect as AccountRegistration;
            isEqual = (
                this.username().equals(other.username()) &&
                this.dob().equals(other.dob()) &&
                this.tag().equals(other.tag())
            );
        }

        return isEqual;
    }

    public serialize(): string {
        return JSON.stringify({
            dob: this.dob().toString(),
            username: this.username().toString(),
            age: this.age(),
            tag: this.tag().toString(),
        });
    }

    /**
     * tag()
     * 
     * gets the tag.
     */

    public tag(): Tag {
        return this._tag;
    }

    /**
     * username()
     * 
     * gets the username.
     */

    public username(): Username {
        return this._username;
    }
}