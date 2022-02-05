import { Value } from '@domeniere/framework';
import { TagInterface } from './tag.interface';
export declare class Tag extends Value implements TagInterface {
    private readonly _value;
    /**
     * @param value the value of the tag. Tags start with a '@' character.
     * @throws TagException when the tag is invalid.
     */
    constructor(value: string);
    equals(suspect: any): boolean;
    serialize(): string;
    /**
     * value()
     *
     * gets the value of the tag.
     */
    value(): string;
}
//# sourceMappingURL=tag.d.ts.map