import "reflect-metadata";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';
/**
 * OnInternal() Decorator.
 *
 * OnInternal() decorator is a method-decorator that
 * automatically adds an observer for any framework
 * event.
 */
export declare function OnInternal<T>({ priority, label, stopPropogationOnError }: EventHandlerOptions): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-internal.decorator.d.ts.map