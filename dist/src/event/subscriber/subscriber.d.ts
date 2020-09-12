import { SubscriberInterface } from "./subscriber.interface";
import { SubscriberId } from "./subscriber-id";
import { DomainEvent } from "../domain-event/domain-event";
import { Equatable } from "foundation";
import { EventHandler } from "./event-handler.type";
export declare class Subscriber implements SubscriberInterface, Equatable {
    private readonly _eventName;
    private readonly _id;
    private _handler;
    private _label;
    private _priority;
    private _handleAttempts;
    private _stopPropogationOnError;
    constructor(id: SubscriberId, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError?: boolean);
    equals(suspect: any): boolean;
    eventName(): string;
    handleAttempts(): number;
    id(): SubscriberId;
    incrementFailedHandleAttempts(): void;
    label(): string;
    handleEvent(event: DomainEvent): Promise<void>;
    priority(): number;
    resetHandleAttempts(): void;
    shouldStopPropogationOnError(): boolean;
}
//# sourceMappingURL=subscriber.d.ts.map