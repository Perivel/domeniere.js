import { DomainEventHandlerPriority } from "@domeniere/event";
import { EventDescriptor } from "./event-decryptor";
/**
 * OnAny() Decorator.
 *
 * OnAny() decorator is a method-decorator that
 * automatically adds an observer for any event.
 */
export declare function OnAny<T>(priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-any.decorator.d.ts.map