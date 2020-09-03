
/**
 * EventEmitterInterface
 * 
 * EventEmitterInterface specifies the event functions.
 */

import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { SubscriberInterface } from "../subscriber/subscriber.interface";

export interface EventEmitterInterface {

    /**
     * addListener()
     * 
     * addListener() adds a listener.
     * @param subscriber The subscriber to add.
     */

    addSubscriber(subscriber: SubscriberInterface): void;

    /**
     * emit()
     * 
     * emit() emits an event.
     * @param event The event to emit.
     */

    emit(event: DomainEventInterface): Promise<void>;

    /**
     * removeListener()
     * 
     * removeListener() removes a listener.
     */

    removeSubscriber(subscriber: SubscriberInterface): void;

}