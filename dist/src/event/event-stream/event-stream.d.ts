import { EventStreamInterface } from "./event-stream.interface";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { EventHandler } from "../subscriber/event-handler.type";
import { NetworkEventQueueInterface } from "../../common/common.module";
export declare class EventStream implements EventStreamInterface {
    private static _instance;
    private emitter;
    private _eventStore;
    private _publishQueue;
    private _publicQueue;
    private _shouldSaveInternalEvents;
    private constructor();
    static instance(): EventStream;
    emit(event: DomainEvent): Promise<void>;
    eventStore(): EventStore;
    saveInternalEvents(): void;
    setEventStore(eventStore: EventStore): void;
    setPublicQueue(queue: NetworkEventQueueInterface): void;
    setPublishQueue(queue: NetworkEventQueueInterface): void;
    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError?: boolean): void;
}
//# sourceMappingURL=event-stream.d.ts.map