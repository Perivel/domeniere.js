import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventDescriptor } from "./event-decryptor";
export declare function OnError<T extends {
    EventName: () => string;
    new (...args: any): InstanceType<T>;
}>(priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-error.decorator.d.ts.map