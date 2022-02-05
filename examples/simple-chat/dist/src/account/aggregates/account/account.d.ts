import { TimestampedAggregate } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { User } from '../../entities/entities.well';
import { Tag, UserId, Username } from '../../values/values.well';
import { AccountInterface } from './account.interface';
/**
 * Account
 *
 * A user account.
 */
export declare class Account extends TimestampedAggregate implements AccountInterface {
    constructor(user: User, version?: number | undefined, createdOn?: DateTime, updatedOn?: DateTime, deletedOn?: DateTime | null);
    equals(suspect: any): boolean;
    id(): UserId;
    /**
     * ownerAge()
     *
     * gets the owner age.
     */
    ownerAge(): number;
    /**
     * ownerDob()
     *
     * gets the owner date of birth.
     */
    ownerDob(): DateTime;
    protected root(): User;
    protected serializeData(): string;
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
     * gets the tag.
     */
    tag(): Tag;
    /**
     * username()
     *
     * gets the account username.
     */
    username(): Username;
}
//# sourceMappingURL=account.d.ts.map