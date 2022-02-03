import { DomainEvent } from "../domain-event/domain-event";
import { DateTime } from "@swindle/core";
/**
 * EventBroadcastFailed
 *
 * The EventBroadcastFailed event indicates that the event broadcasting service failed.
 */
export declare class EventBroadcastFailed extends DomainEvent {
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
     * EventVersion()
     *
     * EventVersion() gets the event version.
     */
    static EventVersion(): number;
    /**
     * error()
     *
     * error() gets the error that occcured.
     */
    error(): Error;
    /**
     * serializeData()
     *
     * serializeData() serializes the event data.
     */
    serializeData(): string;
}
//# sourceMappingURL=event-broadcast-failed.event.d.ts.map