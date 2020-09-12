import { UUID } from "foundation";
import { EventStream } from "../event-stream/event-stream";
import { DomainEventHandlerPriority } from "../subscriber/domain-event-handler-priority.enum";
import { EventAggregate } from "../event-emitter/event-aggregate..type";
export function OnError(priority = DomainEventHandlerPriority.MEDIUM, label = UUID.V4().id(), stopPropogationOnError = false) {
    return function (parentCls, funcName, descriptor) {
        const func = descriptor.value;
        const handlerPriority = Number(priority);
        const eventName = EventAggregate.Error.toString();
        if (func) {
            const identifier = `${parentCls.constructor.name}.${funcName.toString()}.on-${eventName}`;
            EventStream.instance().subscribe(identifier, eventName, handlerPriority, label, func, stopPropogationOnError);
        }
    };
}
