import { Value } from '@domeniere/framework';
import { UserIdInterface } from './user-id.interface';
/**
 * UserId
 *
 * A User Id.
 */
export declare class UserId extends Value implements UserIdInterface {
    private readonly _value;
    /**
     * @param value the value of the id.
     * @throws UserIdException when the id is invalid.
     */
    constructor(value: string);
    /**
     * Generate()
     *
     * generates a UserId.
     * @returns the generated UserId
     */
    static Generate(): UserId;
    equals(suspect: any): boolean;
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=user-id.d.ts.map