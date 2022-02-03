"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnError = void 0;
require("reflect-metadata");
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
/**
 * OnError() Decorator.
 *
 * OnError() decorator is a method-decorator that
 * automatically adds an observer for any general error
 * event.
 */
function OnError(priority = framework_1.DomainEventHandlerPriority.MEDIUM, label = core_1.UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        // get the function the decorator was applied to.
        //const origValue = descriptor.value!;
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = framework_1.EventAggregate.Error;
        // This section changes the handler function so that it still has access to the "this" keyword.
        // We also get the subdomain in which the event will be registered here. This works under the 
        // assmption that this decorator is being called within an Api class body.
        //let subdomain = (parentCls as Api).subdomainName;
        // descriptor.value = async function <T extends DomainEvent>(event: T): Promise<void> {
        //     return origValue.apply(this, [event]);
        // }
        const func = descriptor.value;
        if (func) {
            // add the subscription as a callback to be registered by the @Subdomain decorator.
            const registrationFn = (context, subdomain) => framework_1.Domain.EventStream(subdomain).subscribe(eventName, func.bind(context), handlerPriority, label, stopPropogationOnError);
            if (Reflect.hasMetadata(framework_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls)) {
                const callbacks = Reflect.getMetadata(framework_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, parentCls);
                callbacks.push(registrationFn);
            }
            else {
                const callbacksArr = new Array();
                callbacksArr.push(registrationFn);
                Reflect.defineMetadata(framework_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, callbacksArr, parentCls);
            }
        }
    };
}
exports.OnError = OnError;
//# sourceMappingURL=on-error.decorator.js.map