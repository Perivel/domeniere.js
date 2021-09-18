import "reflect-metadata";
import { DomainEventHandlerPriority } from "@domeniere/event";
import { EventDescriptor } from "./event-decryptor";
/**
 * OnInternal() Decorator.
 *
 * OnInternal() decorator is a method-decorator that
 * automatically adds an observer for any framework
 * event.
 */
export declare function OnInternal<T>(priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-internal.decorator.d.ts.map