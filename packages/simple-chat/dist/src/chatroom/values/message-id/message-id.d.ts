import { Value } from '@domeniere/value';
import { MessageIdInterface } from './message-id.interface';
export declare class MessageId extends Value implements MessageIdInterface {
    private readonly _id;
    constructor(value: string);
    static Generate(): MessageId;
    equals(suspect: any): boolean;
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=message-id.d.ts.map