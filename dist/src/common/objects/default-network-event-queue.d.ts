import { NetworkEventQueue } from "./network-event-queue";
import { DomainEvent } from "../../event/event.module";
export declare class DefaultNetworkEventQueue extends NetworkEventQueue {
    private queue;
    constructor();
    dequeue(): Promise<DomainEvent | null>;
    enqueue(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=default-network-event-queue.d.ts.map