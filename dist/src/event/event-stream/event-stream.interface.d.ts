import { EventHandler } from "../subscriber/event-handler.type";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { EventStore } from "../event-store/event-store";
export interface EventStreamInterface {
    emit(event: DomainEventInterface): Promise<void>;
    eventStore(): EventStore;
    setEventStore(eventStore: EventStore): void;
    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError: boolean): void;
}
//# sourceMappingURL=event-stream.interface.d.ts.map