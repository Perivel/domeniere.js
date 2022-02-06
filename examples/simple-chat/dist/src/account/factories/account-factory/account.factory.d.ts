import { AbstractFactory } from '@domeniere/framework';
import { Account } from '../../aggregates/aggregates.well';
import { AccountRegistration, UserId } from '../../values/values.well';
import { AccountFactoryInterface } from './account-factory.interface';
export declare class AccountFactory extends AbstractFactory implements AccountFactoryInterface {
    constructor();
    /**
     * createFromRegistration()
     *
     * creates an account from a registration object.
     * @param registration the registration to create the account from.
     * @param id the user id to assign to the account.
     */
    createFromRegistration(registration: AccountRegistration, id: UserId): Account;
}
//# sourceMappingURL=account.factory.d.ts.map