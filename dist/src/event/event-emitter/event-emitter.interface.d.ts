import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { SubscriberInterface } from "../subscriber/subscriber.interface";
export interface EventEmitterInterface {
    addSubscriber(subscriber: SubscriberInterface): void;
    emit(event: DomainEventInterface): Promise<void>;
    removeSubscriber(subscriber: SubscriberInterface): void;
}
//# sourceMappingURL=event-emitter.interface.d.ts.map