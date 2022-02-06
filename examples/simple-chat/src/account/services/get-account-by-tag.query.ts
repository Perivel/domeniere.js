import { Query, RepositoryException } from '@domeniere/framework';
import { Account } from '../aggregates/aggregates.well';
import { AccountNotFoundException } from '../exceptions/exceptions.well';
import { AccountRepository } from '../repositories/repositories.well';
import { Tag } from '../values/values.well';

/**
 * GetAccountByTagQuery
 * 
 * Gets ana account by its tag.
 */

export class GetAccountByTagQuery extends Query {

    constructor(
        private readonly repository: AccountRepository,
    ) {
        super();
    }

    /**
     * execute()
     * 
     * executes the operation.
     * @param tag the tag to search for.
     * @returns the account associated with the tag.
     * @throws AccountNotFoundException when the account cannot be found.
     * @throws RepositoryException when there is an error with the repository.
     */

    public async execute(tag: Tag): Promise<Account> {
        let account: Account|null = null;
        try {
            account = await this.repository.getByTag(tag);
        }
        catch(e) {
            throw new RepositoryException((e as Error).message);
        }

        if (account) {
            return account;
        }
        else {
            throw new AccountNotFoundException();
        }
    }
}