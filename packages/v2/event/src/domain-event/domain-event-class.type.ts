import { DomainEvent } from "./domain-event";

/**
 * DomainEventClass
 * 
 * A speciial type for a DomainEventClass argument.
 */

export type DomainEventClass<T extends DomainEvent> = { 
    EventName: () => string, 
    EventClassification: () => string,
    EventVersion: () => number,
    new(...args: any[]): T 
}