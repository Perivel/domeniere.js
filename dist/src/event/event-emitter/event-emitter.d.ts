import { EventEmitterInterface } from "./event-emitter.interface";
import { Subscriber } from "../subscriber/subscriber";
import { DomainEvent } from "../domain-event/domain-event";
/**
 * EventEmitter
 */
export declare class EventEmitter implements EventEmitterInterface {
    private subscribers;
    private maxRetries;
    constructor(maxRetries?: number);
    /**
     * add()
     *
     * add() attempts to add a subscription to the publisher list.
     *
     * NOTE: Duplicate subscriptions will not be added.
     * @param subscriber The subscription to be added.
     */
    addSubscriber(subscriber: Subscriber): void;
    /**
     * emit()
     *
     * emit() emits an event.
     * @param event The event to emit.
     * @emits EventHandlerFailed When an event handler fails.
     */
    emit(event: DomainEvent): Promise<void>;
    /**
     * removeSubscriber()
     *
     * remove() removes a subscription.
     * @param suspect The subscription to be removed.
     */
    removeSubscriber(suspect: Subscriber): void;
    /**
     * subscriberExists()
     *
     * subscriberExists() determines whether or not a subscription exists already.
     * @param suspect The suscpect to be found.
     */
    private subscriberExists;
    /**
     * executeEventHandlers()
     *
     * executeEventHandlers() executes the event handlers for the event.
     * @param subscribersArray the list of subscribers to call.
     * @param event the event to execute upon.
     * @emits EventHandlerFailed when a subscriber fails.
     */
    private executeEventHandlers;
}
//# sourceMappingURL=event-emitter.d.ts.map