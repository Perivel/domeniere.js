import "reflect-metadata";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';
/**
 * OnAny() Decorator.
 *
 * OnAny() decorator is a method-decorator that
 * automatically adds an observer for any event.
 */
export declare function OnAny<T>(options?: EventHandlerOptions): (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => void;
//# sourceMappingURL=on-any.decorator.d.ts.map