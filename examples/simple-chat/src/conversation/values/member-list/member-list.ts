import { Value } from '@domeniere/framework';
import { MethodUndefinedException } from '@swindle/core';
import { HighlightSpanKind } from 'typescript';
import { Account, Tag } from '../../../account/account.module';
import { MemberListInterface } from './member-list.interface';

/**
 * MemberList
 * 
 * The member list.
 */

export class MemberList extends Value implements MemberListInterface {

    private readonly _members: Set<Account>;

    constructor(members: Set<Account> = new Set()) {
        super();
        this._members = members;
    }

    /**
     * add()
     * 
     * adds a member to the list.
     * @param member adds a member to the member list.
     */

    public add(member: Account): MemberList {
        const current: Account[] = [];
        this._members.forEach(member => current.push(member));

        if (!current.some(suspect => suspect.equals(member))) {
            current.push(member);
        }
        return new MemberList(new Set(current));
    }

    /**
    * contains()
    * 
    * determines if the llist contains a member.
    * @param member the member to check for.
    */

    public contains(member: Account): boolean {
        return this._members.has(member);
    }

    public equals(suspect: any): boolean {
        throw new MethodUndefinedException();
    }

    /**
     * getByTag()
     * 
     * gets a member by its tag, if it exists.
     * @param tag the tag
     */

    public getByTag(tag: Tag): Account | null {
        let account: Account|null = null;

        this._members.forEach(member => {
            if (member.tag().equals(tag)) {
                account = member;
            }
        });

        return account;
    }

    /**
     * remove()
     * 
     * removes a memeber from the list.
     * @param member the member to remove.
     */

    public remove(member: Account): MemberList {
        const current: Account[] = [];
        this._members.forEach(suspect => {
            if (!member.equals(suspect)) {
                current.push(suspect);
            }
        });
        return new MemberList(new Set(current));
    }

    public serialize(): string {
        const list: Account[] = [];
        this._members.forEach(mem => list.push(mem));
        return JSON.stringify({
            membeers: list.map(member => member.serialize())
        });
    }
}