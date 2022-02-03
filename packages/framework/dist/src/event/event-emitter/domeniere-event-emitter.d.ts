import { EventEmitter, EventEmitterHandlerErrorHook, EventEmitterHook, Subscriber } from "@swindle/event-emitter";
import { PriorityQueue } from "@swindle/structs";
import { DomainEvent } from "../domain-event/domain-event";
/**
 * DomeniereEventEmitter
 *
 * A custom event emitter with the additional capability of recognizing aggregate events.
 */
export declare class DomeniereEventEmitter extends EventEmitter {
    constructor(subscribers?: Subscriber[], onBeforeHandlersExecute?: EventEmitterHook | undefined, onAfterHandlersExecute?: EventEmitterHook | undefined, onHandlerError?: EventEmitterHandlerErrorHook | undefined);
    /**
     * getSubscribersForEvent()
     *
     * gets the relevant subscribers for the given event. We extend the Swindle EventEmitter so it can recognize aggregate
     * event subscribers.
     *
     * this method is called internally by the EventEmitter to get the relevant subscribers.
     *
     * @param event the event
     * @param subscribers the list of all subscribers.
     * @returns A priority queue consisting of the relevant subscribers for the given event.
     */
    protected getSubscribersForEvent(event: DomainEvent, subscribers: Subscriber[]): PriorityQueue<Subscriber>;
    emit(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=domeniere-event-emitter.d.ts.map