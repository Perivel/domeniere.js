
/**
 * EventRegistrationCallback
 */

// export type EventRegistrationCallbackFn<T extends DomainEvent> = (subdomain: string, event: EventAggregate | Type<T>, handler: DomainEventHandler<T>, priority ?: DomainEventHandlerPriority, label ?: string, stopPropogationOnError ?: boolean) => void

export type EventRegistrationCallbackFn = (context: unknown, subdomain: string) => void