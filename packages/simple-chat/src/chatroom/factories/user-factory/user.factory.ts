import { AbstractFactory } from '@domeniere/factory';
import { User, UserData, UserId, UserProfile } from '../../chatroom.module';
import { Nickname } from '../../values/nickname/nickname';
import { Username } from '../../values/username/username';
import { UserFactoryInterface } from './user-factory.interface';


export class UserFactory extends AbstractFactory implements UserFactoryInterface {
    
    constructor() {
        super();
    }

    public createFromRaw(id: string, first_name: string, last_name: string, nickname: string): User {
        return new User(
            new UserProfile(new UserId(id), new Username(first_name, last_name)),
            new Nickname(nickname)
        );
    }

    public createFromData(data: UserData): User {
        return this.createFromRaw(data.id, data.first_name, data.last_name, data.nickname);
    }
}