import { Value } from '@domeniere/framework';
import { MessageContentInterface } from './message-content.interface';

/**
 * MessageContent
 * 
 * The content of the message.
 */

export class MessageContent extends Value implements MessageContentInterface {

    private readonly _val: string;

    constructor(value: string) {
        super();
        this._val = value;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof MessageContent) {
            const other = suspect as MessageContent;
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
     * gets the value of the messaage value.
     */

    public value(): string {
        return this._val;
    }
}