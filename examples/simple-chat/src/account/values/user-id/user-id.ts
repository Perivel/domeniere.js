import { Value } from '@domeniere/framework';
import { UUID } from '@swindle/core';
import { UserIdException } from '../../exceptions/exceptions.well';
import { UserIdInterface } from './user-id.interface';

/**
 * UserId
 * 
 * A User Id.
 */

 export class UserId extends Value implements UserIdInterface {

    private readonly _value: string;

    /**
     * @param value the value of the id.
     * @throws UserIdException when the id is invalid.
     */
    constructor(value: string) {
        super();

        try {
            const id = new UUID(value);
            this._value = id.id();
        }
        catch(e) {
            throw new UserIdException();
        }
    }

    /**
     * Generate()
     * 
     * generates a UserId.
     * @returns the generated UserId
     */

    public static Generate(): UserId {
        return new UserId(UUID.V4().id());
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