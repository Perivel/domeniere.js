import { NetworkEventQueueInterface } from "./network-event-queue.interface";
import { DomainEvent } from "../../event/event.module";
export declare abstract class NetworkEventQueue implements NetworkEventQueueInterface {
    constructor();
    abstract dequeue(): Promise<DomainEvent | null>;
    abstract enqueue(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=network-event-queue.d.ts.map