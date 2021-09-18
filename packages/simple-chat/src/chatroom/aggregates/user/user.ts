import { State } from '@domeniere/common';
import { Aggregate } from '@domeniere/aggregate';
import { MethodUndefinedException } from '@swindle/core';
import { UserProfile } from '../../entities/entities.well';
import { Nickname } from '../../values/nickname/nickname';
import { UserInterface } from './user.interface';
import { Username } from '../../values/username/username';
import { UserId } from '../../chatroom.module';


export class User extends Aggregate implements UserInterface {

    @State()
    private _nickname: Nickname;

    constructor(user: UserProfile, nickname: Nickname, version: number|undefined = 1.0) {
        super(user, version);
        this._nickname = nickname;
    }

    public equals(suspect: any): boolean {

        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public nickname(): Nickname {
        return this._nickname;
    }

    public setNickname(nickname: Nickname): void {
        this._nickname = nickname;
        this.commitStateChanges();
    }

    protected serializeData(): string {
        return JSON.stringify({
            nickname: this.nickname().serialize()
        });
    }

    public username(): Username {
        return this.root().username();
    }

    protected root(): UserProfile {
        return super.root() as UserProfile;
    }
}