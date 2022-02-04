import 'reflect-metadata';
import { 
    Domain, 
    DomainEvent, 
    DomainEventClass, 
    EventRegistrationCallbackFn, 
    EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY
} from "@domeniere/framework";
import { EventDescriptor } from "./event-decryptor";
import { EventHandlerOptions } from './event-handler-options.interface';
import { mergeOptions } from './helpers.fns';

/**
 * On() Decorator.
 * 
 * On() decorator is a method-decorator that 
 * automatically adds an observer for the specified
 * event.
 */

export function On<T extends DomainEvent>(event: DomainEventClass<T>, options?: EventHandlerOptions) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {
        const handlerOptions = mergeOptions(options);

        // Set the subscription priority
        const handlerPriority = handlerOptions.priority!;

        // get the event name.
        const eventName = (event as any).EventName();
        const func = descriptor.value;

        if (func) {
            // add the subscription as a callback to be handled by the @Subdomain decorator.
            const registrationFn: EventRegistrationCallbackFn = (context, subdomain) =>  Domain.EventStream(subdomain).subscribe(event, func.bind(context), handlerPriority, handlerOptions.label!, handlerOptions.stopPropogationOnError!);

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
