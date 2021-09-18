import { DomainEvent } from '@domeniere/event';
import { DateTime } from '@swindle/core';
import { Conversation, User } from '../chatroom.module';
export declare class ConversationJoined extends DomainEvent {
    private _conversation;
    private _user;
    constructor(user: User, conversation: Conversation, occuredOn?: DateTime, id?: string | undefined);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    conversation(): Conversation;
    isError(): boolean;
    serializeData(): string;
    shouldBeBroadcasted(): boolean;
    user(): User;
}
//# sourceMappingURL=conversation-joined.event.d.ts.map