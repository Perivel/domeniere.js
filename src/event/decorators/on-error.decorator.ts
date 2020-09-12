import { UUID } from "foundation";
import { EventStream } from "../event-stream/event-stream";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventAggregate } from "../event-emitter/event-aggregate..type";
import { EventDescriptor } from "./event-decryptor";

/**
 * OnError() Decorator.
 * 
 * OnError() decorator is a method-decorator that 
 * automatically adds an observer for any general error
 * event.
 */

export function OnError<T extends { EventName: () => string, new(...args: any): InstanceType<T> }>(priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // get the function the decorator was applied to.
        const func = descriptor.value;

        // Set the subscription priority
        const handlerPriority = Number(priority);

        // get the event name.
        const eventName = EventAggregate.Error.toString();

        if (func) {
            // create the subscription identifier.
            const identifier = `${parentCls.constructor.name}.${funcName.toString()}.on-${eventName}`;

            // add the subscription.
            EventStream.instance().subscribe(identifier, eventName, handlerPriority, label, func, stopPropogationOnError);
        }
    }
}