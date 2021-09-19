import 'reflect-metadata';
import { DomainEvent, DomainEventClass, DomainEventHandlerPriority } from "@domeniere/event";
import { EventDescriptor } from "./event-decryptor";
/**
 * On() Decorator.
 *
 * On() decorator is a method-decorator that
 * automatically adds an observer for the specified
 * event.
 */
export declare function On<T extends DomainEvent>(event: DomainEventClass<T>, priority?: DomainEventHandlerPriority, label?: string, stopPropogationOnError?: boolean): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on.decorator.d.ts.map