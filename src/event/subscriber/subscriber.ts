import { SubscriberInterface } from "./subscriber.interface";
import { SubscriberId } from "./subscriber-id";
import { DomainEvent } from "../domain-event/domain-event";
import { Equatable } from "@perivel/foundation";
import { EventHandler } from "./event-handler.type";

/**
 * EventSubscription
 * 
 * EventSubscription represents an Event Subscription.
 */

export class Subscriber implements SubscriberInterface, Equatable {
    private readonly _eventName: string;
    private readonly _id: SubscriberId;
    private _handler: EventHandler;
    private _label: string;
    private _priority: number;
    private _handleAttempts: number;
    private _stopPropogationOnError: boolean;

    /**
     * Creates an EventSubscription instance.
     * @param id The id of the subscription.
     * @param eventName the name of the event to subscribe to.
     * @param handler the event handler. 
     */

    constructor(id: SubscriberId, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError: boolean = false) {
        this._id = id;
        this._eventName = eventName;
        this._handler = handler;
        this._label = label;
        this._priority = priority;
        this._handleAttempts = 0;
        this._stopPropogationOnError = stopPropogationOnError;
    }

    /**
     * equals()
     * 
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared
     */

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Subscriber) {
            const other = suspect as Subscriber;
            isEqual = this.id().equals(other.id()) && this.eventName() === other.eventName();
        }

        return isEqual;
    }

    /**
     * eventName()
     * 
     * eventName() gets the name of the event being subscribed to.
     */

    public eventName(): string {
        return this._eventName;
    }

    /**
     * handleAttempts()
     * 
     * gets the number of times the subscriber's handleEvent() function was called and failed.
     */

    public handleAttempts(): number {
        return this._handleAttempts;
    }

    /**
     * id()
     * 
     * id() gets the subscription id.
     */

    public id(): SubscriberId {
        return this._id;
    }

    /**
     * incrementFailedHandleAttempts()
     * 
     * increments the number of times the handler has failed.
     */

    public incrementFailedHandleAttempts(): void {
        this._handleAttempts++;
    }

    /**
     * label()
     * 
     * label() gets the subscription label.
     */

    public label(): string {
        return this._label;
    }

    /**
     * Executes the subscriber's designated event action.
     * @param event The event object
     */

    public async handleEvent(event: DomainEvent): Promise<void> {
        await this._handler(event);
    }

    /**
     * priority()
     * 
     * priority() gets the priority of the event.
     */

    public priority(): number  {
        return this._priority;
    }

    /**
     * resetHandleAttempts()
     * 
     * resets the number of handle attempts.
     */

    public resetHandleAttempts(): void {
        this._handleAttempts = 0;
    }

    /**
     * shouldStopPropogationOnError()
     * 
     * shouldStopPropogationOnError() determines if the event propogation
     * should stop if the handler encounters an error.
     */

    public shouldStopPropogationOnError(): boolean {
        return this._stopPropogationOnError;
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id().serialize(),
            event: this.eventName(),
            label: this.label(),
            priority: this.priority(),
            attempts: this.handleAttempts(),
            stop_propogation_on_error: this.shouldStopPropogationOnError(),
        });
    }
}