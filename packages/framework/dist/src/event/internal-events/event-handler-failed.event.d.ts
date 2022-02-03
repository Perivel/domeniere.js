import { DateTime } from "@swindle/core";
import { Subscriber } from "@swindle/event-emitter";
import { DomainEvent } from "../domain-event/domain-event";
/**
 * EventHandlerFailed
 *
 * EventHandlerFailed indicates that an event handler has failed.
 */
export declare class EventHandlerFailed extends DomainEvent {
    private readonly _handler;
    private readonly _event;
    private readonly _error;
    constructor(handler: Subscriber, event: DomainEvent, error: Error, timestamp?: DateTime, id?: string | undefined);
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
     * error()
     *
     * the error that occured.
     * @returns the error that occured.
     */
    error(): Error;
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
    serializeData(): string;
}
//# sourceMappingURL=event-handler-failed.event.d.ts.map