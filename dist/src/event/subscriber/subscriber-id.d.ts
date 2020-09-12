import { Id } from "foundation";
import { SubscriberIdInterface } from "./subscriber-id.interface";
export declare class SubscriberId extends Id implements SubscriberIdInterface {
    constructor(value: string);
    equals(suspect: any): boolean;
    id(): string;
}
//# sourceMappingURL=subscriber-id.d.ts.map