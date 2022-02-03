import { DomainEventHandlerPriority } from "@domeniere/framework";


export interface EventHandlerOptions {
    priority?: DomainEventHandlerPriority;
    label?: string;
    stopPropogationOnError?: boolean;
}