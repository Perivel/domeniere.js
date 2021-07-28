import { DomainEvent } from "../domain-event/domain-event";
import { DateTime } from "swindle";
/**
 * EventStoreFailed
 *
 * The EventStoreFailed event indicates that the event store failed to store and event.
 */
export declare class EventStoreFailed extends DomainEvent {
    private readonly _error;
    constructor(error: Error, timestamp?: DateTime, id?: string | undefined);
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventName(): string;
    /**
     * EventClassification()
     *
     * EventClassification() gets the event classification.
     */
    static EventClassification(): string;
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventVersion(): number;
    /**
     * error()
     *
     * error() gets the error that occcured.
     */
    error(): Error;
    /**
     * serialize()
     *
     * serialize() serializes the event data.
     */
    serializeData(): string;
}
//# sourceMappingURL=event-store-failed.event.d.ts.map