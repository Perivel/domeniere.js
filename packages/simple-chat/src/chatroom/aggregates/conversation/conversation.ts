import { TimestampedAggregate } from '@domeniere/aggregate';
import { State } from '@domeniere/common';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { ConversationInfo } from '../../entities/conversation-info/conversation-info';
import { Message } from '../../entities/message/message';
import { ConversationInterface } from './conversation.interface';


export class Conversation extends TimestampedAggregate implements ConversationInterface {

    @State()
    private _messages: Message[];

    constructor(conversation: ConversationInfo, messages: Message[] = [], version: number|undefined = 1.0, createdOn: DateTime = DateTime.Now(), updatedOn: DateTime = DateTime.Now(), deletedOn: DateTime|null = null) {
        super(conversation, version, createdOn, updatedOn, deletedOn);
        this._messages = messages;
    }

    public addMember(member: UserId): void {
        this.root().addMember(member);
        this.commitStateChanges();
    }

    public clearMessages(): void {
        this._messages = [];
        this.commitStateChanges();
    }

    public equals(suspect: any): boolean {

        let isEquals = false;

        if (suspect instanceof Conversation) {
            const other = suspect as Conversation;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public messages(): Message[] {
        return this._messages;
    }

    public postMessage(message: Message): void {
        if (this.root().hasMember(message.authorId())) {
            this._messages = [...this.messages(), message];
            this.commitStateChanges();
        }
    }

    public removeMember(member: UserId): void {
        this.root().removeMember(member);
        this.commitStateChanges();
    }

    protected serializeData(): string {
        return JSON.stringify({
            messages: this.messages().map(msg => msg.serialize()),
        });
    }

    protected root(): ConversationInfo {
        return super.root() as ConversationInfo;
    }
}