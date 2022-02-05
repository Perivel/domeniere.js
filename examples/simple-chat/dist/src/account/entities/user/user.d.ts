import { Entity } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { Tag, UserId, Username } from '../../values/values.well';
import { UserInterface } from './user.interface';
/**
 * User
 *
 * Represents a User entity.
 */
export declare class User extends Entity implements UserInterface {
    private _tag;
    private readonly _dob;
    private _username;
    constructor(id: UserId, username: Username, tag: Tag, dob: DateTime);
    /**
     * age()
     *
     * gets the age of the user.
     */
    age(): number;
    /**
     * dob()
     *
     * gets the Date of Birth.
     */
    dob(): DateTime;
    equals(suspect: any): boolean;
    id(): UserId;
    serializeData(): string;
    /**
     * setUsername()
     *
     * sets the username.
     * @param username the username to set.
     */
    setUsername(username: Username): void;
    /**
     * tag()
     *
     * gets the user tag.
     */
    tag(): Tag;
    /**
     * username()
     *
     * gets the username.
     */
    username(): Username;
}
//# sourceMappingURL=user.d.ts.map