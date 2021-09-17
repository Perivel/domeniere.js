import { TimestampedEntity } from '@domeniere/entity';
import { DateTime } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { MessageId } from '../../values/message-id/message-id';
import { Nickname } from '../../values/nickname/nickname';
import { Username } from '../../values/username/username';
import { MessageInterface } from './message.interface';
export declare class Message extends TimestampedEntity implements MessageInterface {
    private readonly _author_id;
    private readonly _display_name;
    private _content;
    constructor(id: MessageId, displayName: Username | Nickname, content: string, author: UserId, createdOn?: DateTime, updatedOn?: DateTime, deletedOn?: DateTime | null);
    equals(suspect: any): boolean;
    authorId(): UserId;
    content(): string;
    name(): Username | Nickname;
    serializeData(): string;
    setContent(content: string): void;
}
//# sourceMappingURL=message.d.ts.map