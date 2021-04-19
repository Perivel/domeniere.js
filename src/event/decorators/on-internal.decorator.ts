import { UUID } from "@perivel/foundation";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventAggregate } from "../event-emitter/event-aggregate..type";
import { EventDescriptor } from "./event-decryptor";
import { Domain } from "../../domain/domain.module";

/**
 * OnInternal() Decorator.
 * 
 * OnInternal() decorator is a method-decorator that 
 * automatically adds an observer for any framework
 * event.
 */

export function OnInternal<T extends { EventName: () => string, new(...args: any): InstanceType<T> }>(priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // get the function the decorator was applied to.
        const func = descriptor.value;

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = EventAggregate.Internal;

        if (func) {
            // add the subscription.
            Domain.EventStream().subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    }
}