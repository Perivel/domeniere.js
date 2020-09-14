import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
import { Subscriber } from "../subscriber/subscriber";
export declare class EventHandlerFailed extends DomainEvent {
    private readonly _handler;
    private readonly _event;
    constructor(handler: Subscriber, event: DomainEvent, timestamp?: Timestamp, id?: string | undefined);
    static EventName(): string;
    static EventClassification(): string;
    static EventVersion(): number;
    event(): DomainEvent;
    handler(): Subscriber;
    attempts(): number;
    serialize(): string;
}
//# sourceMappingURL=event-handler-failed.event.d.ts.map