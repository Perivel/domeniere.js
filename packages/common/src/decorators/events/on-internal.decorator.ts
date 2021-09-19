import "reflect-metadata";
import { Domain } from "@domeniere/domain";
import { DomainEvent, DomainEventHandlerPriority, EventAggregate } from "@domeniere/event";
import { UUID } from "@swindle/core";
import { EventDescriptor } from "./event-decryptor";
import { EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY } from './../constants';
import { EventRegistrationCallbackFn } from "./event-registration-callback.type";

/**
 * OnInternal() Decorator.
 * 
 * OnInternal() decorator is a method-decorator that 
 * automatically adds an observer for any framework
 * event.
 */

export function OnInternal<T>(priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // get the function the decorator was applied to.
        const origValue = descriptor.value!;

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = EventAggregate.Internal;

        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        //let subdomain = (parentCls as Api).subdomainName;
        
        descriptor.value = async function <T extends DomainEvent>(event: T): Promise<void> {
            return origValue.apply(this, [event]);
        }

        const func = descriptor.value;

        if (func) {
            // add the subscription as a callback to be registered by the @Subdomain decorator.
            const registrationFn: EventRegistrationCallbackFn = (subdomain: string) => Domain.EventStream(subdomain).subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);

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