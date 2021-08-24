import { EventEmitterInterface } from "./event-emitter.interface";
import { Subscriber } from "../subscriber/subscriber";
import { DomainEvent } from "../domain-event/domain-event";
import { PriorityQueue } from "@swindle/structs";
import { EventAggregate } from "./event-aggregate..type";
import { EventHandlerFailed } from "../libevents/event-handler-failed.event";
import { Domain } from "../../domain/domain.module";

/**
 * EventEmitter
 */

export class EventEmitter implements EventEmitterInterface{

    private subscribers: Array<Subscriber>;
    private maxRetries: number;

    constructor(maxRetries: number = 3) {
        this.subscribers = new Array<Subscriber>();
        this.maxRetries = maxRetries;
    }

    /**
     * add()
     * 
     * add() attempts to add a subscription to the publisher list.
     * 
     * NOTE: Duplicate subscriptions will not be added.
     * @param subscriber The subscription to be added.
     */

    public addSubscriber(subscriber: Subscriber): void {
        if (subscriber && (!this.subscriberExists(subscriber))) {
            this.subscribers.push(subscriber);
        }
    }

    /**
     * emit()
     * 
     * emit() emits an event.
     * @param event The event to emit.
     * @emits EventHandlerFailed When an event handler fails.
     */

    public async emit(event: DomainEvent): Promise<void> {

        const queue = new PriorityQueue<Subscriber>();

        // get the relevant subscribers.
        const eventName = event.eventName();
        this.subscribers.forEach(sub => {
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

        // handle the events.
        await this.executeEventHandlers(queue.toArray(), event);
    }

    /**
     * removeSubscriber()
     * 
     * remove() removes a subscription.
     * @param suspect The subscription to be removed.
     */

    public removeSubscriber(suspect: Subscriber): void {
        this.subscribers = this.subscribers.filter(subscriber => !subscriber.equals(suspect));
    }


    // HELPERS

    /**
     * subscriberExists()
     * 
     * subscriberExists() determines whether or not a subscription exists already.
     * @param suspect The suscpect to be found.
     */

    private subscriberExists(suspect: Subscriber): boolean {
        const foundSubscribers = this.subscribers.filter(subscription => suspect.equals(subscription));
        return foundSubscribers.length !== 0;
    }

    // HELPERS

    /**
     * executeEventHandlers()
     * 
     * executeEventHandlers() executes the event handlers for the event.
     * @param subscribersArray the list of subscribers to call.
     * @param event the event to execute upon.
     * @emits EventHandlerFailed when a subscriber fails.
     */

    private async executeEventHandlers(subscribersArray: Subscriber[], event: DomainEvent): Promise<boolean> {
        for (let sub of subscribersArray) {
            try {
                // execute the operation.
                await sub.handleEvent(event);
                sub.resetHandleAttempts();
            }
            catch(error) {
                // The handler failed.
                sub.incrementFailedHandleAttempts();

                // emit the event handler failed event.
                await Domain.EventStream().emit(new EventHandlerFailed(sub, event, error));
                
                if (sub.shouldStopPropogationOnError()) {
                    return false;
                }
            }
        }
        return true;
    }
 }