import { NetworkEventQueue } from "./network-event-queue";
import { StoredEventInterface } from "../../event/event-store/stored-event.interface";
export declare class DefaultNetworkEventQueue extends NetworkEventQueue {
    private queue;
    constructor();
    dequeue(): Promise<StoredEventInterface[]>;
    enqueue(event: StoredEventInterface): Promise<void>;
}
//# sourceMappingURL=default-network-event-queue.d.ts.map