import { Timestamp } from "foundation";
export interface StoredEventInterface {
    eventBody(): string;
    eventClassification(): string;
    eventId(): string;
    eventName(): string;
    eventVersion(): number;
    isPublished(): boolean;
    markPublished(): void;
    occuredOn(): Timestamp;
}
//# sourceMappingURL=stored-event.interface.d.ts.map