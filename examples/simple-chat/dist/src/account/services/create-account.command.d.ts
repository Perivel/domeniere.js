import { Command } from '@domeniere/framework';
import { AccountFactory } from '../factories/factories.well';
import { AccountRepository } from '../repositories/repositories.well';
import { AccountRegistration } from '../values/values.well';
/**
 * CreateAccountCommand
 *
 * Creates an account form a registration.
 */
export declare class CreateAccountCommand extends Command {
    private readonly accountFactory;
    private readonly accountRepository;
    constructor(accountFactory: AccountFactory, accountRepository: AccountRepository);
    /**
     * execute()
     *
     * executes the operation.
     * @param registration the registration to build for.
     * @throws RepositoryException when there is an error with the repository.
     * @emits AccountCreated when the account has been created successfully.
     */
    execute(registration: AccountRegistration): Promise<void>;
}
//# sourceMappingURL=create-account.command.d.ts.map