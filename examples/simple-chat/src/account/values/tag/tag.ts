import { Value } from '@domeniere/framework';
import { TagException } from '../../exceptions/exceptions.well';
import { TagInterface } from './tag.interface';


 export class Tag extends Value implements TagInterface {

    private readonly _value: string;

    /**
     * @param value the value of the tag. Tags start with a '@' character.
     * @throws TagException when the tag is invalid.
     */
    constructor(value: string) {
        super();
        if ((value.length > 1) && (value.startsWith('@'))) {
            this._value = value;
        }
        else {
            throw new TagException();
        }
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Tag) {
            const other = suspect as Tag;
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
      * gets the value of the tag.
      */

    public value(): string {
        return this._value;
    }
}