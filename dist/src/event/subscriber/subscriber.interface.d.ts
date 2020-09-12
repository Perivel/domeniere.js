import { SubscriberIdInterface } from "./subscriber-id.interface";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
export interface SubscriberInterface {
    eventName(): string;
    id(): SubscriberIdInterface;
    label(): string;
    handleEvent(event: DomainEventInterface): Promise<void>;
    priority(): number;
    shouldStopPropogationOnError(): boolean;
}
//# sourceMappingURL=subscriber.interface.d.ts.map