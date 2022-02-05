import { IdentityGeneratingRepository, Aggregate } from '@domeniere/framework';
import { MethodUndefinedException } from '@swindle/core';
import { Account } from '../aggregates/aggregates.well';
import { Tag, UserId } from '../values/values.well';

/**
 * AccountRepository
 * 
 * The accounts repository.
 */

export abstract class AccountRepository extends IdentityGeneratingRepository {

    constructor() {
        super();
    }

    public generateIdentity(): UserId {
        return UserId.Generate();
    }

    /**
     * getById()
     * 
     * gets an account by its id.
     * @param id the id of the account to retrieve.
     * @throws any exception when there is an error with the repository.
     */

    public abstract getById(id: UserId): Promise<Account|null>

    /**
     * getByTag()
     * 
     * gets the account by its tag.
     * @param tag the tag of the account to retrieve.
     * @throws any exception when there is an error with the repository.
     */
    
    public abstract getByTag(tag: Tag): Promise<Account|null>;

    /**
     * remove()
     * 
     * removes an account from the repository.
     * @param account the account to remove.
     * @throws any exception when there is an error with the repository.
     */

    public abstract remove(account: Account): Promise<void>;

    /**
     * save()
     * 
     * saves the account to the repository.
     * @param account the account to save.
     * @throws any exception when there is an error with the repository.
     */

    public abstract save(account: Account): Promise<void>;

    public abstract size(): Promise<number>;
}