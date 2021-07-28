import { Id } from "swindle";
import { DomainEventIdInterface } from "./domain-event-id.interface";
/**
 * DoainEventId
 *
 * DomainEventId represents the domain event id.
 */
export declare class DomainEventId extends Id implements DomainEventIdInterface {
    constructor(value: string);
    /**
     * Generate()
     *
     * generate creates a random DomainEventId.
     */
    static Generate(): DomainEventId;
    equals(suspect: any): boolean;
    /**
     * id()
     *
     * id() gets the value of the Domain event id.
     */
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=domain-event-id.d.ts.map