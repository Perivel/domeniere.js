import { NetworkEventQueue } from "./network-event-queue";
import { DomainEvent } from "../../event/event.module";
/**
 * The Default Network Event Queue
 */
export declare class DefaultNetworkEventQueue extends NetworkEventQueue {
    private queue;
    constructor();
    dequeue(): Promise<DomainEvent | null>;
    enqueue(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=default-network-event-queue.d.ts.map