import { Id } from "foundation";
import { DomainEventIdInterface } from "./domain-event-id.interface";
export declare class DomainEventId extends Id implements DomainEventIdInterface {
    constructor(value: string);
    static Generate(): DomainEventId;
    equals(suspect: any): boolean;
    id(): string;
}
//# sourceMappingURL=domain-event-id.d.ts.map