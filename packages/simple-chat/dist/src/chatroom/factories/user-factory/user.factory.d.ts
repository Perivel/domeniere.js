import { AbstractFactory } from '@domeniere/factory';
import { User, UserData } from '../../chatroom.module';
import { UserFactoryInterface } from './user-factory.interface';
export declare class UserFactory extends AbstractFactory implements UserFactoryInterface {
    constructor();
    createFromRaw(id: string, first_name: string, last_name: string, nickname: string): User;
    createFromData(data: UserData): User;
}
//# sourceMappingURL=user.factory.d.ts.map