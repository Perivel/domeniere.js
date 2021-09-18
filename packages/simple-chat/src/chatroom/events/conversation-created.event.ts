import { DomainEvent } from '@domeniere/event';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { Conversation, User } from '../chatroom.module';


export class ConversationCreated extends DomainEvent {

    private _conversation: Conversation;

    constructor(conversation: Conversation, occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
        this._conversation = conversation;
    }

    public static EventClassification(): string {
        return 'simple-chat';
    }

    public static EventName(): string {
        return 'conversation-created';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public conversation(): Conversation {
        return this._conversation;
    }

    public isError(): boolean {
        return false;
    }

    public serializeData(): string {
        return JSON.stringify({
            conversation: this.conversation().serialize()
        });
    }

    public shouldBeBroadcasted(): boolean {
        return true;
    }
}