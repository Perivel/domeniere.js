import { DomainEventHandlerPriority } from "@domeniere/framework";
export interface EventHandlerOptions {
    priority?: DomainEventHandlerPriority;
    label?: string;
    stopPropogationOnError?: boolean;
}
export declare const defaultOptions: EventHandlerOptions;
//# sourceMappingURL=event-handler-options.interface.d.ts.map