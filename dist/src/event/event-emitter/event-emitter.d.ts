import { EventEmitterInterface } from "./event-emitter.interface";
import { Subscriber } from "../subscriber/subscriber";
import { DomainEvent } from "../domain-event/domain-event";
export declare class EventEmitter implements EventEmitterInterface {
    private subscribers;
    private maxRetries;
    constructor(maxRetries?: number);
    addSubscriber(subscriber: Subscriber): void;
    emit(event: DomainEvent): Promise<void>;
    removeSubscriber(suspect: Subscriber): void;
    private subscriberExists;
}
//# sourceMappingURL=event-emitter.d.ts.map