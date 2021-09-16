import { AbstractFactory } from '@domeniere/factory';
import { User } from '../../aggregates/aggregates.well';
import { UserData } from '../../data/data.well';
import { UserDataFactoryInterface } from './user-data-factory.interface';


export class UserDataFactory extends AbstractFactory implements UserDataFactoryInterface {
    
    constructor() {
        super();
    }

    public createFromUserObject(user: User): UserData {
        const data = new UserData();
        data.id = user.id().id();
        data.first_name = user.username().first();
        data.last_name = user.username().last();
        data.nickname = user.nickname().toString()
        return data;
    }
}