import { Command, RepositoryException } from '@domeniere/framework';
import { AccountCreated } from '../events/events.well';
import { AccountFactory } from '../factories/factories.well';
import { AccountRepository } from '../repositories/repositories.well';
import { AccountRegistration } from '../values/values.well';

/**
 * CreateAccountCommand
 * 
 * Creates an account form a registration.
 */

export class CreateAccountCommand extends Command {

    constructor(
        private readonly accountFactory: AccountFactory,
        private readonly accountRepository: AccountRepository,
    ) {
        super();
    }

    /**
     * execute()
     * 
     * executes the operation.
     * @param registration the registration to build for.
     * @throws RepositoryException when there is an error with the repository.
     * @emits AccountCreated when the account has been created successfully.
     */

    public async execute(registration: AccountRegistration): Promise<void> {
        const account = this.accountFactory.createFromRegistration(
            registration,
            this.accountRepository.generateIdentity(),
        );

        try {
            await this.accountRepository.save(account);
            account.confirmStateChanges();
            await this.emit(new AccountCreated(account));
        }
        catch(e) {
            throw new RepositoryException((e as Error).message);
        }
    }
}