import { AbstractFactory } from '@domeniere/factory';
import { User } from '../../aggregates/aggregates.well';
import { UserData } from '../../data/data.well';
import { UserDataFactoryInterface } from './user-data-factory.interface';
export declare class UserDataFactory extends AbstractFactory implements UserDataFactoryInterface {
    constructor();
    createFromUserObject(user: User): UserData;
}
//# sourceMappingURL=user-data.factory.d.ts.map