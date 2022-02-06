import { Module } from '@domeniere/framework';
import { AccountDataFactory, AccountFactory, AccountRegistrationFactory } from './factories/factories.well';
import { AccountRepository } from './repositories/repositories.well';
import { CreateAccountCommand, GetAccountByTagQuery } from './services/services.well';


export default class AccountModule extends Module {
    constructor() {
        super('account');
    }

    protected createdBindings() {
        // register module bindings here.
        this.bindFactory(AccountDataFactory, _ => new AccountDataFactory());
        this.bindFactory(AccountRegistrationFactory, _ => new AccountRegistrationFactory());
        this.bindFactory(AccountFactory, _ => new AccountFactory());
        this.bindRepository(AccountRepository);
        this.bindService(CreateAccountCommand, module => {
            return new CreateAccountCommand(
                module.get(AccountFactory),
                module.get(AccountRepository)
            );
        });
        this.bindService(GetAccountByTagQuery, module => {
            return new GetAccountByTagQuery(module.get(AccountRepository));
        });
    }
}

// module well exports go here.
export * from "./values/values.well";
export * from "./exceptions/exceptions.well";
export * from "./entities/entities.well";
export * from "./aggregates/aggregates.well";
export * from "./repositories/repositories.well";
export * from "./data/data.well";
export * from "./factories/factories.well";
export * from "./services/services.well";
export * from "./events/events.well";
export * from "./specifications/specifications.well";