import { State } from '@domeniere/common';
import { Entity } from '@domeniere/entity';
import { MethodUndefinedException } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { Username } from '../../values/username/username';
import { UserProfileInterface } from './user-profile.interface';


 export class UserProfile extends Entity implements UserProfileInterface {

    @State()
    private _username: Username;

    constructor(id: UserId, username: Username) {
        super(id);
        this._username = username;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof UserProfile) {
            const other = suspect as UserProfile;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public username(): Username {
        return this._username;
    }

    public setUsername(username: Username): void {
        this._username = username;
        this.commitStateChanges();
    }

    public serializeData(): string {
        return JSON.stringify({
            username: this.username().serialize(),
        });
    }
}