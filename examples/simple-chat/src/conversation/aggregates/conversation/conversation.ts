import { State } from '@domeniere/common';
import { TimestampedAggregate, Entity, Identifier, } from '@domeniere/framework';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { Account } from '../../../account/account.module';
import { Group, Message } from '../../entities/entities.well';
import { ConversationId, MemberList } from '../../values/values.well';
import { ConversationInterface } from './conversation.interface';

/**
 * Conversation
 * 
 * The conversation.
 */

export class Conversation extends TimestampedAggregate implements ConversationInterface {

    @State()
    private _messages: Message[];

    constructor(
        root: Group,
        messages: Message[],
        version: number|undefined = 1.0, 
        createdOn: DateTime = DateTime.Now(), 
        updatedOn: DateTime = DateTime.Now(), 
        deletedOn: DateTime|null = null
    ) {
        super(root, version, createdOn, updatedOn, deletedOn);
        this._messages = messages;
    }

    public addMember(member: Account): void {
        this.root().join(member);
        this.commitStateChanges();
    }

    public addMessage(message: Message): void {
        this._messages = [...this._messages, message];
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

    public hasMember(member: Account): boolean {
        return this.root().containsMember(member);
    }

    public host(): Account {
        return this.root().host();
    }

    public id(): ConversationId {
        return super.id() as ConversationId;
    }

    public members(): MemberList {
        return this.root().members();
    }

    public removeMember(member: Account): void {
        this.root().leave(member);
        this.commitStateChanges();
    }

    protected root(): Group {
        return super.root() as Group;
    }

    protected serializeData(): string {
        return JSON.stringify({
            messages: this._messages.map(msg => msg.serialize())
        });
    }
}