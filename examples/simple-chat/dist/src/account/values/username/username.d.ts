import { Value } from '@domeniere/framework';
import { UsernameInterface } from './username.interface';
/**
 * Username
 *
 * A username
 */
export declare class Username extends Value implements UsernameInterface {
    private readonly _val;
    constructor(value: string);
    equals(suspect: any): boolean;
    serialize(): string;
    /**
     * value()
     *
     * gets the value of the username.
     */
    value(): string;
}
//# sourceMappingURL=username.d.ts.map