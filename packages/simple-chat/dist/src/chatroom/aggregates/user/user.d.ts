import { Aggregate } from '@domeniere/aggregate';
import { UserProfile } from '../../entities/entities.well';
import { Nickname } from '../../values/nickname/nickname';
import { UserInterface } from './user.interface';
import { Username } from '../../values/username/username';
import { UserId } from '../../chatroom.module';
export declare class User extends Aggregate implements UserInterface {
    private _nickname;
    constructor(user: UserProfile, nickname: Nickname, version?: number | undefined);
    equals(suspect: any): boolean;
    id(): UserId;
    nickname(): Nickname;
    setNickname(nickname: Nickname): void;
    protected serializeData(): string;
    username(): Username;
    protected root(): UserProfile;
}
//# sourceMappingURL=user.d.ts.map