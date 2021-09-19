"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnInternal = void 0;
require("reflect-metadata");
const domain_1 = require("@domeniere/domain");
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
const constants_1 = require("./../constants");
/**
 * OnInternal() Decorator.
 *
 * OnInternal() decorator is a method-decorator that
 * automatically adds an observer for any framework
 * event.
 */
function OnInternal(priority = event_1.DomainEventHandlerPriority.MEDIUM, label = core_1.UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        // get the function the decorator was applied to.
        const origValue = descriptor.value;
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = event_1.EventAggregate.Internal;
        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        //let subdomain = (parentCls as Api).subdomainName;
        descriptor.value = async function (event) {
            //subdomain = (this as Api).subdomainName;
            return origValue.apply(this, [event]);
        };
        const func = descriptor.value;
        if (func) {
            // add the subscription as a callback to be registered by the @Subdomain decorator.
            const registrationFn = (subdomain) => domain_1.Domain.EventStream(subdomain).subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
            if (Reflect.hasMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls)) {
                const callbacks = Reflect.getMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls);
                callbacks.push(registrationFn);
            }
            else {
                const callbacksArr = new Array();
                callbacksArr.push(registrationFn);
                Reflect.defineMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, callbacksArr, parentCls);
            }
        }
    };
}
exports.OnInternal = OnInternal;
//# sourceMappingURL=on-internal.decorator.js.map