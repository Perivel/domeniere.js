import { State } from '@domeniere/common';
import { Entity } from '@domeniere/framework';
import { DateTime, Duration } from '@swindle/core';
import { Tag, UserId, Username } from '../../values/values.well';
import { UserInterface } from './user.interface';

/**
 * User
 * 
 * Represents a User entity.
 */

export class User extends Entity implements UserInterface {

    @State()
    private _tag: Tag;

    @State()
    private readonly _dob: DateTime;

    @State()
    private _username: Username;

    constructor(id: UserId, username: Username, tag: Tag, dob: DateTime) {
        super(id);
        this._tag = tag;
        this._dob = dob;
        this._username = username;
    }

    /**
     * age()
     * 
     * gets the age of the user.
     */

    public age(): number {
        const now = DateTime.Now();
        const age = Duration.FromDateTimeDifference(now, this.dob());
        const ageInYears = Math.floor(age.inYears());
        return Math.abs(ageInYears);
    }

    /**
     * dob()
     * 
     * gets the Date of Birth.
     */

    public dob(): DateTime {
        return this._dob;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public serializeData(): string {
        return JSON.stringify({
            age: this.age().toString(),
            dob: this.dob().toString(),
            tag: this.tag().serialize(),
        });
    }

    /**
     * setUsername()
     * 
     * sets the username.
     * @param username the username to set.
     */

    public setUsername(username: Username): void {
        this._username = username;
        this.commitStateChanges();
    }

    /**
     * tag()
     * 
     * gets the user tag.
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