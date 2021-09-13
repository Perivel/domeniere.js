import { DomainEvent } from "../domain-event/domain-event";

/**
 * The DomainEventHandler Type.
 */

export type DomainEventHandler = (event: DomainEvent) => Promise<void>;