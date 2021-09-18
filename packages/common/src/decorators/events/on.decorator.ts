import { Api } from "@domeniere/core";
import { Domain } from "@domeniere/domain";
import { DomainEvent, DomainEventHandlerPriority } from "@domeniere/event";
import { Type, UUID } from "@swindle/core";
import { EventDescriptor } from "./event-decryptor";

/**
 * On() Decorator.
 * 
 * On() decorator is a method-decorator that 
 * automatically adds an observer for the specified
 * event.
 */

export function On<T extends DomainEvent>(event: Type<T>, priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return function (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) {

        // get the function the decorator was applied to.
        const origValue = descriptor.value!;

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        //const eventName = (event.constructor as any).EventName();
        const eventName = (event as any).EventName();

        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        let subdomain = (parentCls as Api).subdomainName;
        descriptor.value = async function <T extends DomainEvent>(event: T): Promise<void> {
            //subdomain = (this as Api).subdomainName;
            return origValue?.apply(this, [event]);
        }

        const func = descriptor.value;

        if (func) {
            // add the subscription.
            Domain.EventStream(subdomain).subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    }
}
