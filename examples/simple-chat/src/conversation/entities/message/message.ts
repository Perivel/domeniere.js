import { State } from '@domeniere/common';
import { TimestampedEntity } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { Account } from '../../../account/account.module';
import { 
    MessageContent, 
    MessageId 
} from '../../values/values.well';
import { MessageInterface } from './message.interface';

/**
 * MessageDetails
 * 
 * The details of a message.
 */

export class Message extends TimestampedEntity implements MessageInterface {

    @State()
    private readonly _author: Account;

    @State()
    private _content: MessageContent;

    constructor(
        id: MessageId,
        content: MessageContent,
        author: Account,
        createdOn: DateTime = DateTime.Now(),
        updatedOn: DateTime = DateTime.Now(),
        deletedOn: DateTime|null = null
    ) {
        super(id, createdOn, updatedOn, deletedOn);
        this._author = author;
        this._content = content;
    }

    /**
     * author()
     * 
     * gets the author.
     */

    public author(): Account {
        return this._author;
    }

    /**
     * content()
     * 
     * gets the content of the message.
     */

    public content(): MessageContent {
        return this._content;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof Message) {
            const other = suspect as Message;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): MessageId {
        return super.id() as MessageId;
    }

    public serializeData(): string {
        return JSON.stringify({
            author: this.author().serialize(),
            content: this.content().serialize(),
        });
    }

    /**
     * setContent()
     * 
     * sets the message content.
     * @param content the content to set
     */

    public setContent(content: MessageContent): void {
        this._content = content;
        this.commitStateChanges();
    }
}