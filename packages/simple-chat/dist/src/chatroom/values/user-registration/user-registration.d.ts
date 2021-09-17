import { Value } from '@domeniere/value';
import { Nickname } from '../nickname/nickname';
import { Username } from '../username/username';
import { UserRegistrationInterface } from './user-registration.interface';
export declare class UserRegistration extends Value implements UserRegistrationInterface {
    private readonly _username;
    private readonly _nickname;
    constructor(username: Username, nickname: Nickname | null);
    equals(suspect: any): boolean;
    nickname(): Nickname | null;
    serialize(): string;
    username(): Username;
}
//# sourceMappingURL=user-registration.d.ts.map