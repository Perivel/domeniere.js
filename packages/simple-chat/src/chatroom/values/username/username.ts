import { Value } from '@domeniere/value';
import { MethodUndefinedException } from '@swindle/core';
import { UsernameInterface } from './username.interface';


 export class Username extends Value implements UsernameInterface {

    private readonly _first: string;
    private readonly _last: string;

    constructor(first: string, last: string) {
        super();
        this._first = first;
        this._last = last;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Username) {
            const other = suspect as Username;
            isEqual = (
                (this.first() === other.first()) && 
                (this.last() === other.last())
            );
        }

        return isEqual;
    }

    public first(): string {
        return this._first;
    }

    public last(): string {
        return this._last;
    }

    public serialize(): string {
        return JSON.stringify({
            first: this.first(),
            last: this.last(),
        });
    }
}