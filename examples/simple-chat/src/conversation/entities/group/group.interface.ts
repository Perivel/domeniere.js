import { AccountInterface } from "../../../account/account.module";
import { MemberListInterface } from "../../values/member-list/member-list.interface";


export interface GroupInterface {
    
    containsMember(member: AccountInterface): boolean;

    host(): AccountInterface;

    join(user: AccountInterface): void;

    leave(user: AccountInterface): void;

    members(): MemberListInterface;
}