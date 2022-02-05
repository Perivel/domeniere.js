import { AbstractFactory } from '@domeniere/framework';
import { AccountRegistrationData } from '../../data/data.well';
import { AccountRegistration, Tag, Username } from '../../values/values.well';
import { AccountRegistrationFactoryInterface } from './account-registration-factory.interface';

/**
 * AccountRegistrationFactory
 */

export class AccountRegistrationFactory extends AbstractFactory implements AccountRegistrationFactoryInterface {
    
    constructor() {
        super();
    }

    /**
     * createFromDto()
     * 
     * creates an account registration from a DTO.
     * @param source the DTO source to create the registration from.
     */

    public createFromDto(source: AccountRegistrationData): AccountRegistration {
        return new AccountRegistration(
            new Username(source.username),
            new Tag(source.tag),
            source.dob.toUtc()
        );
    }
}