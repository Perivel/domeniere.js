"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAny = void 0;
const foundation_1 = require("@perivel/foundation");
const domain_event_handler_priority_enum_1 = require("../subscriber/domain-event-handler-priority.enum");
const event_aggregate__type_1 = require("../event-emitter/event-aggregate..type");
const domain_module_1 = require("../../domain/domain.module");
/**
 * OnAny() Decorator.
 *
 * OnAny() decorator is a method-decorator that
 * automatically adds an observer for any event.
 */
function OnAny(priority = domain_event_handler_priority_enum_1.DomainEventHandlerPriority.MEDIUM, label = foundation_1.UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        // get the function the decorator was applied to.
        const func = descriptor.value;
        // Set the subscription priority
        const handlerPriority = priority;
        // get the event name.
        const eventName = event_aggregate__type_1.EventAggregate.Any;
        if (func) {
            // add the subscription.
            domain_module_1.Domain.EventStream().subscribe(eventName, func, handlerPriority, label, stopPropogationOnError);
        }
    };
}
exports.OnAny = OnAny;
