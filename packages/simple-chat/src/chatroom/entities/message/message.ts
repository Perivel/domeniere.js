import { State } from '@domeniere/common';
import { TimestampedEntity } from '@domeniere/entity';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { MessageId } from '../../values/message-id/message-id';
import { Nickname } from '../../values/nickname/nickname';
import { Username } from '../../values/username/username';
import { MessageInterface } from './message.interface';


 export class Message extends TimestampedEntity implements MessageInterface {

    private readonly _author_id: UserId;
    private readonly _display_name: Username|Nickname;

    @State()
    private _content: string;

    constructor(id: MessageId, displayName: Username|Nickname, content: string, author: UserId, createdOn: DateTime = DateTime.Now(), updatedOn: DateTime = DateTime.Now(), deletedOn: DateTime|null = null) {
        super(id, createdOn, updatedOn, deletedOn);
        this._author_id = author;
        this._display_name = displayName;
        this._content = content;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof Message) {
            const other = suspect as Message;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public authorId(): UserId {
        return this._author_id;
    }

    public content(): string {
        return this._content;
    }

    public name(): Username|Nickname {
        return this._display_name;
    }

    public serializeData(): string {
        return JSON.stringify({
            author: {
                id: this.authorId().serialize(),
                name: this.name().serialize()
            },
            content: this.content(),
        });
    }

    public setContent(content: string): void {
        this._content = content;
        this.commitStateChanges();
    }
}