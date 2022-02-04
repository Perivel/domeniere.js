"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On = void 0;
require("reflect-metadata");
const framework_1 = require("@domeniere/framework");
const helpers_fns_1 = require("./helpers.fns");
/**
 * On() Decorator.
 *
 * On() decorator is a method-decorator that
 * automatically adds an observer for the specified
 * event.
 */
function On(event, options) {
    return function (parentCls, funcName, descriptor) {
        const handlerOptions = (0, helpers_fns_1.mergeOptions)(options);
        // Set the subscription priority
        const handlerPriority = handlerOptions.priority;
        // get the event name.
        const eventName = event.EventName();
        const func = descriptor.value;
        if (func) {
            // add the subscription as a callback to be handled by the @Subdomain decorator.
            const registrationFn = (context, subdomain) => framework_1.Domain.EventStream(subdomain).subscribe(event, func.bind(context), handlerPriority, handlerOptions.label, handlerOptions.stopPropogationOnError);
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
exports.On = On;
//# sourceMappingURL=on.decorator.js.map