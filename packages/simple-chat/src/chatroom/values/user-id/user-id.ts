import { Value } from '@domeniere/value';
import { UUID } from '@swindle/core';
import { UserIdInterface } from './user-id.interface';


 export class UserId extends Value implements UserIdInterface {

    private readonly _value: string;

    constructor(value: string) {
        super();
        this._value = value;
    }

    public static Generate(): UserId {
        return new UserId(UUID.V4().id())
    }

    public equals(suspect: any): boolean {
        let isEqual = false; 

        if (suspect instanceof UserId) {
            const other = suspect as UserId;
            isEqual = this.id() === other.id();
        }

        return isEqual;
    }

    public id(): string {
        return this._value;
    }

    public serialize(): string {
        return this.id();
    }
}