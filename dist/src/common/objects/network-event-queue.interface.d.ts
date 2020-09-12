import { StoredEventInterface } from "../../event/event-store/stored-event.interface";
export interface NetworkEventQueueInterface {
    dequeue(): Promise<StoredEventInterface[]>;
    enqueue(event: StoredEventInterface): Promise<void>;
}
//# sourceMappingURL=network-event-queue.interface.d.ts.map