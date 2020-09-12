import { NetworkEventQueueInterface } from "./network-event-queue.interface";
import { StoredEventInterface } from "../../event/event-store/stored-event.interface";
export declare abstract class NetworkEventQueue implements NetworkEventQueueInterface {
    constructor();
    abstract dequeue(): Promise<StoredEventInterface[]>;
    abstract enqueue(event: StoredEventInterface): Promise<void>;
}
//# sourceMappingURL=network-event-queue.d.ts.map