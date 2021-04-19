import { DomainEvent } from "../domain-event/domain-event";

/**
 * A custom type that indicates the form of an event action. 
 */

export type EventHandler = (event: DomainEvent) => Promise<void>;