import { Entity } from '@domeniere/entity';
import { UserId } from '../../chatroom.module';
import { Username } from '../../values/username/username';
import { UserProfileInterface } from './user-profile.interface';
export declare class UserProfile extends Entity implements UserProfileInterface {
    private _username;
    constructor(id: UserId, username: Username);
    equals(suspect: any): boolean;
    username(): Username;
    setUsername(username: Username): void;
    serializeData(): string;
}
//# sourceMappingURL=user-profile.d.ts.map