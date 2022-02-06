"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountCommand = void 0;
const framework_1 = require("@domeniere/framework");
const events_well_1 = require("../events/events.well");
/**
 * CreateAccountCommand
 *
 * Creates an account form a registration.
 */
class CreateAccountCommand extends framework_1.Command {
    constructor(accountFactory, accountRepository) {
        super();
        this.accountFactory = accountFactory;
        this.accountRepository = accountRepository;
    }
    /**
     * execute()
     *
     * executes the operation.
     * @param registration the registration to build for.
     * @throws RepositoryException when there is an error with the repository.
     * @emits AccountCreated when the account has been created successfully.
     */
    async execute(registration) {
        const account = this.accountFactory.createFromRegistration(registration, this.accountRepository.generateIdentity());
        try {
            await this.accountRepository.save(account);
            account.confirmStateChanges();
            await this.emit(new events_well_1.AccountCreated(account));
        }
        catch (e) {
            throw new framework_1.RepositoryException(e.message);
        }
    }
}
exports.CreateAccountCommand = CreateAccountCommand;
