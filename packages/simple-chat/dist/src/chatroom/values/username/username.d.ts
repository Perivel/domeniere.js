import { Value } from '@domeniere/value';
import { UsernameInterface } from './username.interface';
export declare class Username extends Value implements UsernameInterface {
    private readonly _first;
    private readonly _last;
    constructor(first: string, last: string);
    equals(suspect: any): boolean;
    first(): string;
    last(): string;
    serialize(): string;
}
//# sourceMappingURL=username.d.ts.map