import { Timestamp } from "foundation";
import { StoredEventInterface } from "./stored-event.interface";
export declare class StoredEvent implements StoredEventInterface {
    private _eventBody;
    private _eventClassification;
    private _eventId;
    private _eventName;
    private _eventVersion;
    private _occuredOn;
    private _isPublished;
    constructor(eventId: string, eventName: string, eventClassification: string, eventVersion: number, body: string, occuredOn: Timestamp, isPublished?: boolean);
    eventBody(): string;
    eventClassification(): string;
    eventId(): string;
    eventName(): string;
    eventVersion(): number;
    isPublished(): boolean;
    markPublished(): void;
    occuredOn(): Timestamp;
}
//# sourceMappingURL=stored-event.d.ts.map