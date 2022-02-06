import { Query } from '@domeniere/framework';
import { Account } from '../aggregates/aggregates.well';
import { AccountRepository } from '../repositories/repositories.well';
import { Tag } from '../values/values.well';
/**
 * GetAccountByTagQuery
 *
 * Gets ana account by its tag.
 */
export declare class GetAccountByTagQuery extends Query {
    private readonly repository;
    constructor(repository: AccountRepository);
    /**
     * execute()
     *
     * executes the operation.
     * @param tag the tag to search for.
     * @returns the account associated with the tag.
     * @throws AccountNotFoundException when the account cannot be found.
     * @throws RepositoryException when there is an error with the repository.
     */
    execute(tag: Tag): Promise<Account>;
}
//# sourceMappingURL=get-account-by-tag.query.d.ts.map