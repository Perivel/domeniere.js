import { EventHandler } from "../subscriber/event-handler.type";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
export declare function On<T extends {
    EventName: () => string;
    new (...args: any): InstanceType<T>;
}>(event: T, priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
interface EventDescriptor extends PropertyDescriptor {
    value?: EventHandler;
}
export {};
//# sourceMappingURL=on.decorator.d.ts.map