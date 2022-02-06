import { AbstractFactory } from '@domeniere/framework';
import { Account } from '../../aggregates/aggregates.well';
import { AccountData } from '../../data/data.well';
import { AccountDataFactoryInterface } from './account-data-factory.interface';
export declare class AccountDataFactory extends AbstractFactory implements AccountDataFactoryInterface {
    constructor();
    /**
     * createFromAccountObject()
     *
     * creates an account data instance from an Account aggregate.
     * @param object the account object
     */
    createFromAccountObject(object: Account): AccountData;
}
//# sourceMappingURL=account-data.factory.d.ts.map