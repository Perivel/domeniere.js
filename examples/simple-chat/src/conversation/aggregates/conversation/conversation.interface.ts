import { AccountInterface } from "../../../account/account.module";
import { MessageInterface } from "../../entities/entities.well";
import { MemberListInterface } from "../../values/values.well";


export interface ConversationInterface {
    
    addMember(member: AccountInterface): void;

    addMessage(message: MessageInterface): void;

    hasMember(member: AccountInterface): boolean;

    host(): AccountInterface;

    members(): MemberListInterface;

    removeMember(member: AccountInterface): void;
}