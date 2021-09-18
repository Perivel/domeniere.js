import { Value } from '@domeniere/VALUE';
import { ConversationIdInterface } from './conversation-id.interface';
export declare class ConversationId extends Value implements ConversationIdInterface {
    private readonly _id;
    constructor(value: string);
    static Generate(): ConversationId;
    equals(suspect: any): boolean;
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=conversation-id.d.ts.map