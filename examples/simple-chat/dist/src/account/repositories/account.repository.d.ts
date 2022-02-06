import { IdentityGeneratingRepository } from '@domeniere/framework';
import { Account } from '../aggregates/aggregates.well';
import { Tag, UserId } from '../values/values.well';
/**
 * AccountRepository
 *
 * The accounts repository.
 */
export declare abstract class AccountRepository extends IdentityGeneratingRepository {
    constructor();
    generateIdentity(): UserId;
    /**
     * getById()
     *
     * gets an account by its id.
     * @param id the id of the account to retrieve.
     * @throws any exception when there is an error with the repository.
     */
    abstract getById(id: UserId): Promise<Account | null>;
    /**
     * getByTag()
     *
     * gets the account by its tag.
     * @param tag the tag of the account to retrieve.
     * @throws any exception when there is an error with the repository.
     */
    abstract getByTag(tag: Tag): Promise<Account | null>;
    /**
     * remove()
     *
     * removes an account from the repository.
     * @param account the account to remove.
     * @throws any exception when there is an error with the repository.
     */
    abstract remove(account: Account): Promise<void>;
    /**
     * save()
     *
     * saves the account to the repository.
     * @param account the account to save.
     * @throws any exception when there is an error with the repository.
     */
    abstract save(account: Account): Promise<void>;
    abstract size(): Promise<number>;
}
//# sourceMappingURL=account.repository.d.ts.map