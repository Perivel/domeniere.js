import { IdentityGeneratingRepository } from '@domeniere/framework';
import { Account } from '../aggregates/aggregates.well';
import { Tag, UserId } from '../values/values.well';
export declare abstract class AccountRepository extends IdentityGeneratingRepository {
    constructor();
    generateIdentity(): UserId;
    /**
     * getById()
     *
     * gets an account by its id.
     * @param id the id of the account to retrieve.
     * @throws any exception when the
     */
    abstract getById(id: UserId): Promise<Account | null>;
    /**
     * getByTag()
     *
     * gets the account by its tag.
     * @param tag the tag of the account to retrieve.
     */
    abstract getByTag(tag: Tag): Promise<Account | null>;
    abstract remove(account: Account): Promise<void>;
    abstract save(account: Account): Promise<void>;
    abstract size(): Promise<number>;
}
//# sourceMappingURL=account.repository.d.ts.map