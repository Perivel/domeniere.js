import { DateTime } from "swindle";
/**
 * StoredEventInterface
 */
export interface StoredEventInterface {
    /**
     * eventBody()
     *
     * eventBody() gets the event body.
     */
    eventBody(): string;
    /**
     * evnetClassification()
     *
     * eventClassification() gets the event classification.
     */
    eventClassification(): string;
    /**
     * eventId()
     *
     * eventId() gets the event id.
     */
    eventId(): string;
    /**
     * eventName()
     *
     * eventName() gets the event name.
     */
    eventName(): string;
    /**
     * eventVersion()
     *
     * eventVersion() gets the event version.
     */
    eventVersion(): number;
    /**
     * isPublished()
     *
     * isPublished() determines if an event has been published.
     */
    isPublished(): boolean;
    /**
     * markPublished()
     *
     * markPublished() marks a stored event as published.
     */
    markPublished(): void;
    /**
     * occuredOn()
     *
     * occuredOn()
     */
    occuredOn(): DateTime;
    /**
     * shouldBePublished()
     *
     * indicates whether or not the event should be published.
     */
    shouldBePublished(): boolean;
}
//# sourceMappingURL=stored-event.interface.d.ts.map