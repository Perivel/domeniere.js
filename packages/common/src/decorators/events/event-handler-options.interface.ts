import { DomainEventHandlerPriority } from "@domeniere/framework";
import { UUID } from "@swindle/core";


export interface EventHandlerOptions {
    priority?: DomainEventHandlerPriority;
    label?: string;
    stopPropogationOnError?: boolean;
}

export const defaultOptions: EventHandlerOptions = {
    priority: DomainEventHandlerPriority.MEDIUM,
    label: UUID.V4().id(),
    stopPropogationOnError: false
}