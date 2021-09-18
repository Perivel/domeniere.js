import { Entity } from '@domeniere/entity';
import { DateTime } from '@swindle/core';
import { UserId } from '../../chatroom.module';
import { ConversationId } from '../../values/conversation-id/conversation-id';
import { ConversationInfoInterface } from './conversation-info.interface';
export declare class ConversationInfo extends Entity implements ConversationInfoInterface {
    private readonly _host;
    private _members;
    private readonly _createdAt;
    constructor(id: ConversationId, host: UserId, created?: DateTime);
    addMember(member: UserId): void;
    created(): DateTime;
    equals(suspect: any): boolean;
    hasMember(member: UserId): boolean;
    host(): UserId;
    members(): UserId[];
    removeMember(member: UserId): void;
    serializeData(): string;
    id(): ConversationId;
}
//# sourceMappingURL=conversation-info.d.ts.map