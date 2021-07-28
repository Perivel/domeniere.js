"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnError = void 0;
const swindle_1 = require("swindle");
const domain_event_handler_priority_enum_1 = require("../subscriber/domain-event-handler-priority.enum");
const event_aggregate__type_1 = require("../event-emitter/event-aggregate..type");
const domain_module_1 = require("../../domain/domain.module");
/**
 * OnError() Decorator.
 *
 * OnError() decorator is a method-decorator that
 * automatically adds an observer for any general error
 * event.
 */
function OnError(priority = domain_event_handler_priority_enum_1.DomainEventHandlerPriority.MEDIUM, label = swindle_1.UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        // get the function the decorator was applied to.
        const func = descriptor.value;
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = event_aggregate__type_1.EventAggregate.Error;
        if (func) {
            // add the subscription.
            domain_module_1.Domain.EventStream().subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    };
}
exports.OnError = OnError;
//# sourceMappingURL=on-error.decorator.js.map