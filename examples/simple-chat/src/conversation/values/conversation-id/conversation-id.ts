import { Value } from '@domeniere/framework';
import { UUID } from '@swindle/core';
import { ConversationIdException } from '../../exceptions/exceptions.well';
import { ConversationIdInterface } from './conversation-id.interface';

/**
 * ConversationId
 * 
 * The conversation id.
 */

 export class ConversationId extends Value implements ConversationIdInterface {

    private readonly _value: string;

    constructor(value: string) {
        super();

        try {
            const id = new UUID(value);
            this._value = id.id();
        }
        catch(e) {
            throw new ConversationIdException();
        }
    }

    /**
     * Generate()
     * 
     * generates a unique ConversationId
     * @returns the generated ID.
     */

    public static Generate(): ConversationId {
        return new ConversationId(UUID.V4().id());
    }

    public equals(suspect: any): boolean {
        let isEqual = false;
        
        if (suspect instanceof ConversationId) {
            const other = suspect as ConversationId;
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