import { DateTime } from "foundation";
export interface StoredEventInterface {
    eventBody(): string;
    eventClassification(): string;
    eventId(): string;
    eventName(): string;
    eventVersion(): number;
    isPublished(): boolean;
    markPublished(): void;
    occuredOn(): DateTime;
}
//# sourceMappingURL=stored-event.interface.d.ts.map