import { Value } from '@domeniere/value';
import { NicknameInterface } from './nickname.interface';
export declare class Nickname extends Value implements NicknameInterface {
    private readonly _value;
    constructor(value: string);
    equals(suspect: any): boolean;
    value(): string;
    serialize(): string;
}
//# sourceMappingURL=nickname.d.ts.map