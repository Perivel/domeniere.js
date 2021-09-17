import { Value } from '@domeniere/value';
import { UserIdInterface } from './user-id.interface';
export declare class UserId extends Value implements UserIdInterface {
    private readonly _value;
    constructor(value: string);
    static Generate(): UserId;
    equals(suspect: any): boolean;
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=user-id.d.ts.map