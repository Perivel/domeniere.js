import { State } from '@domeniere/common';
import { Entity } from '@domeniere/entity';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { ConversationId } from '../../values/conversation-id/conversation-id';
import { ConversationInfoInterface } from './conversation-info.interface';


 export class ConversationInfo extends Entity implements ConversationInfoInterface {

    private readonly _host: UserId;

    @State()
    private _members: UserId[];

    private readonly _createdAt: DateTime;;

    constructor(id: ConversationId, host: UserId, created: DateTime = DateTime.Now()) {
        super(id);
        this._host = host;
        this._members = [host];
        this._createdAt = created;
    }

    public addMember(member: UserId): void {
        if (!this.hasMember(member)) {
            this._members = [...this.members(), member];
            this.commitStateChanges();
        }
    }

    public created(): DateTime {
        return this._createdAt;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof ConversationInfo) {
            const other = suspect as ConversationInfo;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public hasMember(member: UserId): boolean {
        return this.members().some(mem => mem.equals(member));
    }

    public host(): UserId {
        return this._host;
    }

    public members(): UserId[] {
        return this._members;
    }

    public removeMember(member: UserId): void {
        if (this.hasMember(member)) {
            this._members = this.members().filter(mem => !mem.equals(member));
            this.commitStateChanges();
        }
    }

    public serializeData(): string {
        return JSON.stringify({
            host: this.host().serialize(),
            members: this.members().map(member => member.serialize()),
            created: this.created().toString()
        });
    }
}