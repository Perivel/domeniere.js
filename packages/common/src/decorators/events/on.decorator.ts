import 'reflect-metadata';
import { 
    Domain, 
    DomainEvent, 
    DomainEventClass, 
    DomainEventHandlerPriority,
    EventRegistrationCallbackFn, 
    EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY
} from "@domeniere/framework";
import { UUID } from "@swindle/core";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';

/**
 * On() Decorator.
 * 
 * On() decorator is a method-decorator that 
 * automatically adds an observer for the specified
 * event.
 */

export function On<T extends DomainEvent>(event: DomainEventClass<T>, { priority = DomainEventHandlerPriority.MEDIUM, label = UUID.V4().id(), stopPropogationOnError = false}: EventHandlerOptions) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = (event as any).EventName();
        const func = descriptor.value;

        if (func) {
            // add the subscription as a callback to be handled by the @Subdomain decorator.
            const registrationFn: EventRegistrationCallbackFn = (context, subdomain) =>  Domain.EventStream(subdomain).subscribe(event, func.bind(context), handlerPriority, label, stopPropogationOnError);

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
