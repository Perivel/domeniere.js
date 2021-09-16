import { Value } from '@domeniere/value';
import { MethodUndefinedException } from '@swindle/core';
import { NicknameInterface } from './nickname.interface';


 export class Nickname extends Value implements NicknameInterface {

    private readonly _value: string;
    constructor(value: string) {
        super();
        this._value = value;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Nickname) {
            const other = suspect as Nickname;
            isEqual = this.value() === other.value();
        }

        return isEqual;
    }

    public value(): string {
        return this._value;
    }

    public serialize(): string {
        return this.value();
    }
}