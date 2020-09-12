import { EventStreamInterface } from "./event-stream.interface";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { EventHandler } from "../subscriber/event-handler.type";
export declare class EventStream implements EventStreamInterface {
    private static _instance;
    private emitter;
    private _eventStore;
    private constructor();
    static instance(): EventStream;
    emit(event: DomainEvent): Promise<void>;
    eventStore(): EventStore;
    setEventStore(eventStore: EventStore): void;
    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError?: boolean): void;
}
//# sourceMappingURL=event-stream.d.ts.map