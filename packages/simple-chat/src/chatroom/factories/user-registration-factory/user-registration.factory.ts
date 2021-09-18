import { AbstractFactory } from '@domeniere/factory';
import { Nickname, Username, UserRegistration } from '../../values/values.well';
import { UserRegistrationData } from "./../../data/data.well";
import { UserRegistrationFactoryInterface } from './user-registration-factory.interface';


export class UserRegistrationFactory extends AbstractFactory implements UserRegistrationFactoryInterface {
    
    constructor() {
        super();
    }

    public createFromData(data: UserRegistrationData): UserRegistration {
        return new UserRegistration(
            new Username(data.first_name, data.last_name),
            new Nickname(data.nickname)
        );
    }
}