import { DateTime } from "@swindle/core";
import { Queue } from "@swindle/structs";
import { DomainEvent } from "../domain-event/domain-event";
/**
 * EventsPublished
 *
 * An event indicating that domain events were published successfully.
 */
export declare class EventsPublished extends DomainEvent {
    private readonly _events;
    constructor(events: Queue<DomainEvent>, timestamp?: DateTime, id?: string | undefined);
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
     * events()
     *
     * events() gets the events that were published.
     */
    events(): Queue<DomainEvent>;
    /**
     * serializeData()
     *
     * serializeData() serializes the event data.
     */
    serializeData(): string;
}
//# sourceMappingURL=events-published.event.d.ts.map