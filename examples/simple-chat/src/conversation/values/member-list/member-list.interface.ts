import { AccountInterface, TagInterface } from "../../../account/account.module";


export interface MemberListInterface {
    
    /**
     * add()
     * 
     * adds a member to the list.
     * @param member adds a member to the member list.
     */

    add(member: AccountInterface): MemberListInterface;

    /**
     * contains()
     * 
     * determines if the llist contains a member.
     * @param member the member to check for.
     */

    contains(member: AccountInterface): boolean;

    /**
     * getByTag()
     * 
     * gets a member by its tag, if it exists.
     * @param tag the tag
     */

    getByTag(tag: TagInterface): AccountInterface|null;

    /**
     * remove()
     * 
     * removes a memeber from the list.
     * @param member the member to remove.
     */

    remove(member: AccountInterface): MemberListInterface;
}