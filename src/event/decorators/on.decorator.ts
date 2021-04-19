import { UUID } from "foundation";
import { Domain } from "../../domain/domain.module";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventDescriptor } from "./event-decryptor";

/**
 * On() Decorator.
 * 
 * On() decorator is a method-decorator that 
 * automatically adds an observer for the specified
 * event.
 */

export function On<T extends { EventName: () => string, new(...args: any): InstanceType<T> }>(event: T, priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // get the function the decorator was applied to.
        const func = descriptor.value;

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = event.EventName();

        if (func) {
            // add the subscription.
            Domain.EventStream().subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    }
}
