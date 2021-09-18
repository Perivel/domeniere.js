import { Value } from '@domeniere/VALUE';
import { MethodUndefinedException, UUID } from '@swindle/core';
import { ConversationIdInterface } from './conversation-id.interface';


 export class ConversationId extends Value implements ConversationIdInterface {

    private readonly _id: string;

    constructor(value: string) {
        super();
        this._id = value;
    }

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
        return this._id;
    }

    public serialize(): string {
        return this.id();
    }
}