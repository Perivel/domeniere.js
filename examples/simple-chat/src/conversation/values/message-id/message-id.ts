import { Value } from '@domeniere/framework';
import { UUID } from '@swindle/core';
import { MessageIdException } from '../../exceptions/exceptions.well';
import { MessageIdInterface } from './message-id.interface';

/**
 * MessageId
 * 
 * The message id.
 */

 export class MessageId extends Value implements MessageIdInterface {

    private readonly _value: string;

    /**
     * @param value the value of the id.
     * @throws MessageIdException when the id is invalid.
     */

    constructor(value: string) {
        super();

        try {
            const id = new UUID(value);
            this._value = id.id();
        }
        catch(e) {
            throw new MessageIdException();
        }
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof MessageId) {
            const other = suspect as MessageId;
            isEqual = this.id() === other.id();
        }

        return isEqual;
    }

    public id(): string {
        return this._value;
    }

    public serialize(): string {
        return this.id();
    }
}