import { DomainEvent } from '@domeniere/event';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { Conversation, Message } from '../chatroom.module';


export class MessagePosted extends DomainEvent {

    private _message: Message;
    private _conversation: Conversation;

    constructor(mesage: Message, conversation: Conversation, occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
        this._message = mesage;
        this._conversation = conversation;
    }

    public static EventClassification(): string {
        return 'simple-chat';
    }

    public static EventName(): string {
        return 'message-posted';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public message(): Message {
        return this._message;
    }

    public conversation(): Conversation {
        return this._conversation;
    }

    public isError(): boolean {
        return false;
    }

    public serializeData(): string {
        return JSON.stringify({
            message: this.message().serialize(),
            conversation: this.conversation().serialize()
        });
    }

    public shouldBeBroadcasted(): boolean {
        return true;
    }
}