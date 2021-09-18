import { AbstractFactory } from '@domeniere/factory';
import { UserRegistration } from '../../values/values.well';
import { UserRegistrationData } from "./../../data/data.well";
import { UserRegistrationFactoryInterface } from './user-registration-factory.interface';
export declare class UserRegistrationFactory extends AbstractFactory implements UserRegistrationFactoryInterface {
    constructor();
    createFromData(data: UserRegistrationData): UserRegistration;
}
//# sourceMappingURL=user-registration.factory.d.ts.map