import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventDescriptor } from "./event-decryptor";
export declare function On<T extends {
    EventName: () => string;
    new (...args: any): InstanceType<T>;
}>(event: T, priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on.decorator.d.ts.map