import { DomainEvent } from "../domain-event/domain-event";
import { DateTime } from "foundation";
import { Subscriber } from "../subscriber/subscriber";
/**
 * EventHandlerFailed
 *
 * EventHandlerFailed indicates that an event handler has failed.
 */
export declare class EventHandlerFailed extends DomainEvent {
    private readonly _handler;
    private readonly _event;
    constructor(handler: Subscriber, event: DomainEvent, timestamp?: DateTime, id?: string | undefined);
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
     * event()
     *
     * event() gets the event that caused the error.
     */
    event(): DomainEvent;
    /**
     * handler()
     *
     * handler() gets 4he event handler.
     */
    handler(): Subscriber;
    /**
     * attempts()
     *
     * attempts() gets the number of attemmps the handler has been executed for the current event.
     */
    attempts(): number;
    /**
     * serialize()
     *
     * serialsie() serializes the event data.
     */
    serialize(): string;
}
//# sourceMappingURL=event-handler-failed.event.d.ts.map