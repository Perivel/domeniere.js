import { DateTime } from "foundation";
import { DomainEventIdInterface } from "./domain-event-id.interface";
export interface DomainEventInterface {
    eventClassification(): string;
    eventId(): DomainEventIdInterface;
    eventName(): string;
    isError(): boolean;
    isInternal(): boolean;
    occuredOn(): DateTime;
    eventVersion(): number;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=domain-event.interface.d.ts.map