import { DateTime } from "swindle";
export interface TransmittedEventInterface {
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
     * occuredOn()
     *
     * occuredOn()
     */
    occuredOn(): DateTime;
}
//# sourceMappingURL=transmitted-event.interface.d.ts.map