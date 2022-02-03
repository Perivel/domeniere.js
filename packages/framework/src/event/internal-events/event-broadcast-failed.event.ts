import { DomainEvent } from "../domain-event/domain-event"
import { DateTime } from "@swindle/core";
import { EventClassifications } from "../domain-event/event-classification.enum";

/**
 * EventBroadcastFailed
 * 
 * The EventBroadcastFailed event indicates that the event broadcasting service failed.
 */

export class EventBroadcastFailed extends DomainEvent {

    private readonly _error: Error;

    constructor(error: Error, timestamp: DateTime = DateTime.Now(), id: string | undefined = undefined) {
        super(timestamp, id);
        this._error = error;
    }

    /**
     * EventName()
     * 
     * EventName() gets the event name.
     */

    public static EventName(): string {
        return 'event-broadcast-failed';
    }

    /**
     * EventClassification()
     * 
     * EventClassification() gets the event classification.
     */

    public static EventClassification(): string {
        return EventClassifications.InternalError.toString();
    }

    /**
     * EventVersion()
     * 
     * EventVersion() gets the event version.
     */

    public static EventVersion(): number {
        return 1.0;
    }

    /**
     * error()
     * 
     * error() gets the error that occcured.
     */

    public error(): Error {
        return this._error;
    }

    /**
     * serializeData()
     * 
     * serializeData() serializes the event data.
     */

    public serializeData(): string {
        return JSON.stringify({
            error: this.error().message
        });
    }
}