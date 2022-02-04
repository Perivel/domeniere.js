"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAny = void 0;
require("reflect-metadata");
const framework_1 = require("@domeniere/framework");
const helpers_fns_1 = require("./helpers.fns");
/**
 * OnAny() Decorator.
 *
 * OnAny() decorator is a method-decorator that
 * automatically adds an observer for any event.
 */
function OnAny(options) {
    return (parentCls, funcName, descriptor) => {
        const handlerOptions = (0, helpers_fns_1.mergeOptions)(options);
        // Set the subscription priority
        const handlerPriority = handlerOptions.priority;
        // get the event name.
        const eventName = framework_1.EventAggregate.Any;
        const func = descriptor.value;
        if (func) {
            // add the subscription.
            const registrationFn = (context, subdomain) => framework_1.Domain.EventStream(subdomain).subscribe(eventName, func.bind(context), handlerPriority, handlerOptions.label, handlerOptions.stopPropogationOnError);
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