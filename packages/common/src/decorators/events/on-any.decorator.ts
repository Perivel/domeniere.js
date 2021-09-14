import { Api } from "@domeniere/core";
import { Domain } from "@domeniere/domain";
import { DomainEvent, DomainEventHandlerPriority, EventAggregate } from "@domeniere/event";
import { UUID } from "@swindle/core";
import { EventDescriptor } from "./event-decryptor";

/**
 * OnAny() Decorator.
 * 
 * OnAny() decorator is a method-decorator that 
 * automatically adds an observer for any event.
 */

export function OnAny<T>(priority: DomainEventHandlerPriority = DomainEventHandlerPriority.MEDIUM, label: string = UUID.V4().id(), stopPropogationOnError: boolean = false) {
    return  (parentCls: Object, funcName: string | symbol, descriptor: EventDescriptor) => {

        // get the function the decorator was applied to.
        const origValue = descriptor.value!;

        // Set the subscription priority
        const handlerPriority = priority;

        // get the event name.
        const eventName = EventAggregate.Any;

        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        let subdomain = ""
        descriptor.value = async function<T extends DomainEvent>(event: T): Promise<void> {
            subdomain = (this as Api).subdomainName;
            return origValue.apply(this, [event]);
        }

        const func = descriptor.value;

        if (func) {
            // add the subscription.
            Domain.EventStream(subdomain).subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    }
}