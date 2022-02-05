import { TimestampedAggregate, Entity, Identifier, } from '@domeniere/framework';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { User } from '../../entities/entities.well';
import { Tag, UserId, Username } from '../../values/values.well';
import { AccountInterface } from './account.interface';

/**
 * Account
 * 
 * A user account.
 */

export class Account extends TimestampedAggregate implements AccountInterface {

    constructor(
        user: User, 
        version: number|undefined = 1.0, 
        createdOn: DateTime = DateTime.Now(), 
        updatedOn: DateTime = DateTime.Now(), 
        deletedOn: DateTime|null = null
    ) {
        super(user, version, createdOn, updatedOn, deletedOn);
    }

    public equals(suspect: any): boolean {

        let isEquals = false;

        if (suspect instanceof Account) {
            const other = suspect as Account;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    /**
     * ownerAge()
     * 
     * gets the owner age.
     */

    public ownerAge(): number {
        return this.root().age();
    }

    /**
     * ownerDob()
     * 
     * gets the owner date of birth.
     */

    public ownerDob(): DateTime {
        return this.root().dob();
    }


    protected root(): User {
        return super.root() as User;
    }

    protected serializeData(): string {
        return JSON.stringify({

        });
    }

    /**
     * setUsername()
     * 
     * sets the username.
     * @param username the username to set.
     */

    public setUsername(username: Username): void {
        this.root().setUsername(username);
        this.commitStateChanges();
    }

    /**
     * tag()
     * 
     * gets the tag.
     */

    public tag(): Tag {
        return this.root().tag();
    }

    /**
     * username()
     * 
     * gets the account username.
     */

    public username(): Username {
        return this.root().username();
    }
}