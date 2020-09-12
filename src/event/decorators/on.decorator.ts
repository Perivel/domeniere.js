import { EventHandler } from "../subscriber/event-handler.type";
import { UUID } from "foundation";
import { EventStream } from "../event-stream/event-stream";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";

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
        const handlerPriority = Number(priority);

        // get the event name.
        const eventName = event.EventName();

        if (func) {
            // create the subscription identifier.
            const identifier = `${parentCls.constructor.name}.${funcName.toString()}.on-${eventName}`;

            // add the subscription.
            EventStream.instance().subscribe(identifier, eventName, handlerPriority, label, func, stopPropogationOnError);
        }
    }
}

/**
 * a custom property decriptor designed to take in only event responder function signitures.
 */

interface EventDescriptor extends PropertyDescriptor {
    value?: EventHandler
}