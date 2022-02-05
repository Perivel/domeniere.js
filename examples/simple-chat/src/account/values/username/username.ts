import { Value } from '@domeniere/framework';
import { UsernameInterface } from './username.interface';

/**
 * Username
 * 
 * A username
 */

 export class Username extends Value implements UsernameInterface {

    private readonly _val: string;

    constructor(value: string) {
        super();
        this._val = value;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Username) {
            const other = suspect as Username;
            isEqual = this.value() === other.value();
        }

        return isEqual;
    }

    public serialize(): string {
        return this.value();
    }

     /**
      * value()
      * 
      * gets the value of the username.
      */

    public value(): string {
        return  this._val;
    }
}