import { TimestampedAggregate } from '@domeniere/aggregate';
import { DateTime } from '@swindle/core';
import { ConversationId, UserId } from '../../chatroom.module';
import { ConversationInfo } from '../../entities/conversation-info/conversation-info';
import { Message } from '../../entities/message/message';
import { ConversationInterface } from './conversation.interface';
export declare class Conversation extends TimestampedAggregate implements ConversationInterface {
    private _messages;
    constructor(conversation: ConversationInfo, messages?: Message[], version?: number | undefined, createdOn?: DateTime, updatedOn?: DateTime, deletedOn?: DateTime | null);
    addMember(member: UserId): void;
    clearMessages(): void;
    equals(suspect: any): boolean;
    host(): UserId;
    messages(): Message[];
    postMessage(message: Message): void;
    removeMember(member: UserId): void;
    protected serializeData(): string;
    protected root(): ConversationInfo;
    id(): ConversationId;
}
//# sourceMappingURL=conversation.d.ts.map