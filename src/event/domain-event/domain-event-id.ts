import { Id, UUID } from "swindle";
import { DomainEventIdInterface } from "./domain-event-id.interface";

/**
 * DoainEventId
 * 
 * DomainEventId represents the domain event id.
 */

export class DomainEventId extends Id implements DomainEventIdInterface {

    constructor(value: string) {
        super(value);
    }

    /**
     * Generate()
     * 
     * generate creates a random DomainEventId.
     */

    public static Generate(): DomainEventId {
        return new DomainEventId(UUID.V4().id());
    }

    public equals(suspect: any): boolean {

        let isEqual = false;

        if (suspect instanceof DomainEventId) {
            const other = suspect as DomainEventId;
            return this.id() === other.id();
        }

        return isEqual;
    }

    /**
     * id()
     * 
     * id() gets the value of the Domain event id.
     */

    public id(): string {
        return super.id() as string;
    }

    public serialize(): string {
        return this.id();
    }
}