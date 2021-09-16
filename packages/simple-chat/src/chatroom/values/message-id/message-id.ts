import { Value } from '@domeniere/value';
import { UUID } from '@swindle/core';
import { MessageIdInterface } from './message-id.interface';


 export class MessageId extends Value implements MessageIdInterface {

    private readonly _id: string;

    constructor(value: string) {
        super();
        this._id = value;
    }

    public static Generate(): MessageId {
        return new MessageId(UUID.V4().id());
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
        return this._id;
    }

    public serialize(): string {
        return this.id();
    }
}