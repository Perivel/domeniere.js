import { Value } from '@domeniere/value';

export class Name extends Value {

    private readonly _first: string;
    private readonly _last: string;

    constructor(first: string, last: string) {
        super();
        this._first = first;
        this._last = last;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Name) {
            const other = suspect as Name;
            isEqual = (this.first() === other.first()) && (this.last() === other.last())
        }

        return isEqual;
    }

    public first(): string {
        return this._first;
    }

    public last(): string {
        return this._last
    }

    public serialize(): string {
        return this.first() + " " + this.last();
    }
}