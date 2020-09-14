import { DomainEventInterface } from "../../event/event.module";
export interface NetworkEventQueueInterface {
    dequeue(): Promise<DomainEventInterface | null>;
    enqueue(event: DomainEventInterface): Promise<void>;
}
//# sourceMappingURL=network-event-queue.interface.d.ts.map