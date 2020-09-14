import { EventStreamInterface } from "./event-stream.interface";
import { DomainEvent } from "../domain-event/domain-event";
import { EventStore } from "../event-store/event-store";
import { EventHandler } from "../subscriber/event-handler.type";
import { NetworkEventQueue } from "../../common/common.module";
export declare class EventStream implements EventStreamInterface {
    private static _instance;
    private readonly emitter;
    private readonly _backlogEventQueue;
    private _eventStore;
    private _publishQueue;
    private _publicQueue;
    private _shouldSaveInternalEvents;
    private _eventPublisherTask;
    private constructor();
    static instance(): EventStream;
    static PublishEventsWithinInterval(interval: number): void;
    emit(event: DomainEvent): Promise<void>;
    eventStore(): EventStore;
    saveInternalEvents(): void;
    setEventStore(eventStore: EventStore): void;
    setPublicQueue(queue: NetworkEventQueue): void;
    setPublishQueue(queue: NetworkEventQueue): void;
    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError?: boolean): void;
    private registerInternalEventHandlers;
    private scheduleEventPublisherInterval;
}
//# sourceMappingURL=event-stream.d.ts.map