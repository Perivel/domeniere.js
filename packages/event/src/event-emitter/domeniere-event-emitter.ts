import { 
    EventEmitter, 
    EventEmitterHandlerErrorHook, 
    EventEmitterHook, 
    Subscriber 
} from "@swindle/event-emitter";
import { PriorityQueue } from "@swindle/structs";
import { DomainEvent } from "../domain-event/domain-event";
import { EventAggregate } from "../event-stream/event-aggregate..type";

/**
 * DomeniereEventEmitter
 * 
 * A custom event emitter with the additional capability of recognizing aggregate events.
 */

export class DomeniereEventEmitter extends EventEmitter {

    constructor(
        subscribers: Subscriber[] = [],
        onBeforeHandlersExecute: EventEmitterHook|undefined = undefined,
        onAfterHandlersExecute: EventEmitterHook | undefined = undefined,
        onHandlerError: EventEmitterHandlerErrorHook|undefined = undefined
    ) {
        super(subscribers, onBeforeHandlersExecute, onAfterHandlersExecute, onHandlerError);
    }

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

    protected getSubscribersForEvent(event: DomainEvent, subscribers: Subscriber[]): PriorityQueue<Subscriber> {
        const queue = new PriorityQueue<Subscriber>();
        const eventName = event.eventName();

        subscribers.forEach(sub => {
            if (
                // The subscriber is registered to the specific event.
                (sub.eventName() === eventName) ||

                // The subscriber is listening to all events.
                (sub.eventName() === EventAggregate.Any.toString()) ||

                // The subscriber is listening to framework events.
                ((event.isInternal()) && (sub.eventName() === EventAggregate.Internal.toString())) ||

                // The subscriber is listening to an error event.
                ((event.isError()) && (sub.eventName() === EventAggregate.Error.toString()))
            ) {
                // add the subscriber to the queue.
                queue.enqueue(sub, sub.priority());
            }
        });

        return queue;
    }

    public async emit(event: DomainEvent): Promise<void> {
        await super.emit(event);
    }
}