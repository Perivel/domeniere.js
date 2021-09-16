import { Value } from '@domeniere/value';
import { MethodUndefinedException } from '@swindle/core';
import { UserRepository } from '../../chatroom.module';
import { Nickname } from '../nickname/nickname';
import { Username } from '../username/username';
import { UserRegistrationInterface } from './user-registration.interface';


 export class UserRegistration extends Value implements UserRegistrationInterface {

    private readonly _username: Username;
    private readonly _nickname: Nickname|null;

    constructor(username: Username, nickname: Nickname|null) {
        super();
        this._nickname = nickname;
        this._username = username;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof UserRegistration) {
            const other = suspect as UserRegistration;
            const equalUsername = this.username().equals(other.username());
            const equalNickname = this.nickname() ? this.nickname()!.equals(other.nickname()) : this.nickname() === other.nickname();
            isEqual = equalNickname && equalUsername;
        }

        return isEqual;
    }

    public nickname(): Nickname|null {
        return this._nickname;
    }

    public serialize(): string {
        throw new MethodUndefinedException();
    }

    public username(): Username {
        return this._username;
    }
}