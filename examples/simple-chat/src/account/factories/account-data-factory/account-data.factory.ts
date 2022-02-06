import { AbstractFactory } from '@domeniere/framework';
import { Account } from '../../aggregates/aggregates.well';
import { AccountData, TagData } from '../../data/data.well';
import { AccountDataFactoryInterface } from './account-data-factory.interface';


export class AccountDataFactory extends AbstractFactory implements AccountDataFactoryInterface {
    
    constructor() {
        super();
    }

    /**
     * createFromAccountObject()
     * 
     * creates an account data instance from an Account aggregate.
     * @param object the account object
     */

    public createFromAccountObject(object: Account): AccountData {
        return new AccountData(
            object.id().toString(),
            object.username().toString(),
            new TagData(object.tag().value()),
            object.ownerDob(),
            object.ownerAge(),
            object.createdOn(),
            object.updatedOn(),
            object.deletedOn(),
        );
    }
}