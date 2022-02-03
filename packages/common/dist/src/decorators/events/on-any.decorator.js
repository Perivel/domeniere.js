"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAny = void 0;
require("reflect-metadata");
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
/**
 * OnAny() Decorator.
 *
 * OnAny() decorator is a method-decorator that
 * automatically adds an observer for any event.
 */
function OnAny({ priority = framework_1.DomainEventHandlerPriority.MEDIUM, label = core_1.UUID.V4().id(), stopPropogationOnError = false }) {
    return (parentCls, funcName, descriptor) => {
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = framework_1.EventAggregate.Any;
        const func = descriptor.value;
        if (func) {
            // add the subscription.
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
exports.OnAny = OnAny;
//# sourceMappingURL=on-any.decorator.js.map