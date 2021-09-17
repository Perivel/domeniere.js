import { DomainEvent } from '@domeniere/event';
import { DateTime } from '@swindle/core';
import { Conversation, Message } from '../chatroom.module';
export declare class MessagePosted extends DomainEvent {
    private _message;
    private _conversation;
    constructor(mesage: Message, conversation: Conversation, occuredOn?: DateTime, id?: string | undefined);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    message(): Message;
    conversation(): Conversation;
    isError(): boolean;
    serializeData(): string;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=message-posted.event.d.ts.map