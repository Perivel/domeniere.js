import { DateTime } from 'swindle';
import { TransmittedEventInterface } from './transmitted-event.interface';
/**
 * TransmittedEvent
 *
 * A TransmittedEvent represents an event that was received from an external domain.
 */
export declare class TransmittedEvent implements TransmittedEventInterface {
    private readonly _body;
    private readonly _classification;
    private readonly _id;
    private readonly _name;
    private readonly _version;
    private readonly _occured_on;
    constructor(id: string, name: string, classification: string, version: number, body: string, occuredOn: DateTime);
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
//# sourceMappingURL=transmitted-event.d.ts.map