import 'reflect-metadata';
import { DomainEvent, DomainEventClass } from "@domeniere/framework";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';
/**
 * On() Decorator.
 *
 * On() decorator is a method-decorator that
 * automatically adds an observer for the specified
 * event.
 */
export declare function On<T extends DomainEvent>(event: DomainEventClass<T>, options?: EventHandlerOptions): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on.decorator.d.ts.map