import { State } from '@domeniere/common';
import { Entity, Identifier } from '@domeniere/framework';
import { MethodUndefinedException } from '@swindle/core';
import { isSwitchStatement } from 'typescript';
import { Account } from '../../../account/account.module';
import { MemberList } from '../../values/member-list/member-list';
import { ConversationId } from '../../values/values.well';
import { GroupInterface } from './group.interface';


export class Group extends Entity implements GroupInterface {

    @State()
    private readonly _host: Account;

    @State()
    private _members: MemberList;

    constructor(id: ConversationId, host: Account, members: MemberList) {
        super(id);
        this._host = host;
        this._members = members;
        this._members.add(host);
    }

    public containsMember(member: Account): boolean {
        return this._members.contains(member);
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof Group) {
            const other = suspect as Group;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public host(): Account {
        return this._host;
    }

    public id(): ConversationId {
        return super.id() as ConversationId;
    }

    public join(user: Account): void {
        if (!this._members.contains(user)) {
            this._members = this._members.add(user);
            this.commitStateChanges();
        }
    }

    public leave(user: Account): void {
        if (!user.equals(this.host())) {
            this._members = this._members.remove(user);
            this.commitStateChanges();
        }
    }

    public members(): MemberList {
        return this._members;
    }

    public serializeData(): string {
        return JSON.stringify({
            host: this.host().serialize(),
            members: this.members().serialize(),
        });
    }
}