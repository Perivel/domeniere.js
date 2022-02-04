import "reflect-metadata";
import { 
    Domain, 
    EventAggregate, 
    EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, 
    EventRegistrationCallbackFn 
} from "@domeniere/framework";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';
import { mergeOptions } from './helpers.fns';

/**
 * OnInternal() Decorator.
 * 
 * OnInternal() decorator is a method-decorator that 
 * automatically adds an observer for any framework
 * event.
 */

export function OnInternal<T>(options?: EventHandlerOptions) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {
        const handlerOptions = mergeOptions(options);

        // Set the subscription priority
        const handlerPriority = handlerOptions.priority!;

        // get the event name.
        const eventName = EventAggregate.Internal;
        const func = descriptor.value;

        if (func) {
            // add the subscription as a callback to be registered by the @Subdomain decorator.
            const registrationFn: EventRegistrationCallbackFn = (context, subdomain: string) => Domain.EventStream(subdomain).subscribe(eventName, func.bind(context), handlerPriority, handlerOptions.label!, handlerOptions.stopPropogationOnError!);

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