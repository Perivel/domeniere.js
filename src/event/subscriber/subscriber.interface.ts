
/**
 * SubscriberInterface
 */

import { SubscriberIdInterface } from "./subscriber-id.interface";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { Serializable } from "@perivel/foundation";

export interface SubscriberInterface extends Serializable {

    /**
     * eventName()
     * 
     * eventName() gets the name of the event being subscribed to.
     */

    eventName(): string


    /**
     * id()
     * 
     * id() gets the subscription id.
     */

    id(): SubscriberIdInterface;

    /**
     * label()
     * 
     * label() gets the subscription label.
     */

    label(): string;

    /**
     * Executes the subscriber's designated event action.
     * @param event The event object
     */

    handleEvent(event: DomainEventInterface): Promise<void>;

    /**
     * priority()
     * 
     * the priority of the subscriber.
     */

    priority(): number;

    /**
     * shouldStopPropogationOnError()
     * 
     * shouldStopPropogationOnError() determines if the event propogation
     * should stop if the handler encounters an error.
     */

    shouldStopPropogationOnError(): boolean;
}