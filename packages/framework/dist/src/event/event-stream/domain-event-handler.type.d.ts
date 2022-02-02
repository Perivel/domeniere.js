import { DomainEvent } from "../domain-event/domain-event";
/**
 * The DomainEventHandler Type.
 */
export declare type DomainEventHandler<T extends DomainEvent> = (event: T) => Promise<void>;
//# sourceMappingURL=domain-event-handler.type.d.ts.map