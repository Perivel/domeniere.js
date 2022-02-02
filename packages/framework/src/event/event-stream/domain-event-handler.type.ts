import { DomainEvent } from "../domain-event/domain-event";

/**
 * The DomainEventHandler Type.
 */

export type DomainEventHandler<T extends DomainEvent> = (event: T) => Promise<void>;