import { AbstractFactory } from '@domeniere/framework';
import { Account } from '../../aggregates/aggregates.well';
import { User } from '../../entities/entities.well';
import { AccountRegistration, UserId } from '../../values/values.well';
import { AccountFactoryInterface } from './account-factory.interface';


export class AccountFactory extends AbstractFactory implements AccountFactoryInterface {
    
    constructor() {
        super();
    }

    /**
     * createFromRegistration()
     * 
     * creates an account from a registration object.
     * @param registration the registration to create the account from.
     * @param id the user id to assign to the account.
     */

    public createFromRegistration(registration: AccountRegistration, id: UserId): Account {
        return new Account(
            new User(
                id,
                registration.username(),
                registration.tag(),
                registration.dob(),
            ),
        );
    }
}