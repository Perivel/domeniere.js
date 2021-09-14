import { DomainEventHandlerPriority } from "@domeniere/event";
import { EventDescriptor } from "./event-decryptor";
/**
 * OnError() Decorator.
 *
 * OnError() decorator is a method-decorator that
 * automatically adds an observer for any general error
 * event.
 */
export declare function OnError<T>(priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-error.decorator.d.ts.map