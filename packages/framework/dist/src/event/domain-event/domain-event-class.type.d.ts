import { DomainEvent } from "./domain-event";
/**
 * DomainEventClass
 *
 * A speciial type for a DomainEventClass argument.
 */
export declare type DomainEventClass<T extends DomainEvent> = {
    EventName: () => string;
    EventClassification: () => string;
    EventVersion: () => number;
    new (...args: any[]): T;
};
//# sourceMappingURL=domain-event-class.type.d.ts.map