import { DomainEvent } from '@domeniere/event';
import { DateTime } from '@swindle/core';
import { Conversation } from '../chatroom.module';
export declare class ConversationCreated extends DomainEvent {
    private _conversation;
    constructor(conversation: Conversation, occuredOn?: DateTime, id?: string | undefined);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    conversation(): Conversation;
    isError(): boolean;
    serializeData(): string;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=conversation-created.event.d.ts.map