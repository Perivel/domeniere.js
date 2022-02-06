import { AbstractFactory } from '@domeniere/framework';
import { AccountRegistrationData } from '../../data/data.well';
import { AccountRegistration } from '../../values/values.well';
import { AccountRegistrationFactoryInterface } from './account-registration-factory.interface';
/**
 * AccountRegistrationFactory
 */
export declare class AccountRegistrationFactory extends AbstractFactory implements AccountRegistrationFactoryInterface {
    constructor();
    /**
     * createFromDto()
     *
     * creates an account registration from a DTO.
     * @param source the DTO source to create the registration from.
     */
    createFromDto(source: AccountRegistrationData): AccountRegistration;
}
//# sourceMappingURL=account-registration.factory.d.ts.map