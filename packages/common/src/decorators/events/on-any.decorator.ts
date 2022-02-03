import "reflect-metadata";
import { 
    Domain, 
    DomainEvent, 
    DomainEventHandlerPriority, 
    EventAggregate,
    EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, 
    EventRegistrationCallbackFn,
} from "@domeniere/framework";
import { UUID } from "@swindle/core";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';

/**
 * OnAny() Decorator.
 * 
 * OnAny() decorator is a method-decorator that 
 * automatically adds an observer for any event.
 */

export function OnAny<T>({priority = DomainEventHandlerPriority.MEDIUM, label = UUID.V4().id(), stopPropogationOnError = false}: EventHandlerOptions) {
    return  (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => {

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = EventAggregate.Any;
        const func = descriptor.value;

        if (func) {
            // add the subscription.
            const registrationFn: EventRegistrationCallbackFn = (context, subdomain: string) =>Domain.EventStream(subdomain).subscribe(eventName, func.bind(context), handlerPriority, label, stopPropogationOnError);

            if (Reflect.hasMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls)) {
                const callbacks: EventRegistrationCallbackFn[] = Reflect.getMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls);
                callbacks.push(registrationFn);
            }
            else {
                const callbacksArr = new Array<EventRegistrationCallbackFn>();
                callbacksArr.push(registrationFn);
                Reflect.defineMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, callbacksArr, parentCls);
            }
        }
    }
}