"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnError = void 0;
const domain_1 = require("@domeniere/domain");
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
/**
 * OnError() Decorator.
 *
 * OnError() decorator is a method-decorator that
 * automatically adds an observer for any general error
 * event.
 */
function OnError(priority = event_1.DomainEventHandlerPriority.MEDIUM, label = core_1.UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        // get the function the decorator was applied to.
        const origValue = descriptor.value;
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = event_1.EventAggregate.Error;
        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        let subdomain = "";
        descriptor.value = async function (event) {
            subdomain = this.subdomainName;
            return origValue.apply(this, [event]);
        };
        const func = descriptor.value;
        if (func) {
            // add the subscription.
            domain_1.Domain.EventStream(subdomain).subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    };
}
exports.OnError = OnError;
//# sourceMappingURL=on-error.decorator.js.map