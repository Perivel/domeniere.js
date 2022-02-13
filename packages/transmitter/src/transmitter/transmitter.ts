import { TransmittedEvent } from '@domeniere/framework';
import { Queue } from '@swindle/structs';
import { EventListener } from './event-listener.fn';
import { EventData } from './event-data.interface';
import { DeferredListener } from './deferred-listener.interface';

/**
 * Transmitter
 * 
 * The event transmitter.
 */

export class Transmitter {

    private static _instance: Transmitter|null;
    private readonly listeners: Map<string, EventListener[]>;
    private readonly deferredListeners: Queue<DeferredListener>;

    private constructor() {
        this.listeners = new Map<string, EventListener[]>();
        this.deferredListeners = new Queue();
    }

    get instance(): Transmitter {
        if (!Transmitter._instance) {
            Transmitter._instance = new Transmitter();
        }
        return Transmitter._instance;
    }

    /**
     * getEventSigniture()
     * 
     * gets the event signiture.
     * @param eventClassification the event classification
     * @param eventName the event name.
     * @returns the event signiture.
     */

    private getEventSigniture(eventClassification: string, eventName: string): string {
        return `${eventClassification.trim()}.${eventName.trim()}`;
    }

    /**
     * listen()
     * 
     * creates an event listener.
     * @param eventClassification the event classification
     * @param eventName the event name.
     * @param listener the handler.
     * @throws any exception when the listener fails.
     */

    public listen(eventClassification: string, eventName: string, listener: EventListener): void {
        const eventSigniture = this.getEventSigniture(eventClassification, eventName);

        if (this.listeners.has(eventSigniture)) {
            // add the listener to the list for that signiture.
            this.listeners.get(eventSigniture)!.push(listener);
        }
        else {
            // create a new listener list for that signiture.
            this.listeners.set(eventSigniture, [listener]);
        }
    }

    private async processEvents(event: EventData, listeners: EventListener[]): Promise<void> {
        for (const listen of listeners) {
            try {
                // we execute the listener.
                await listen(event);
            }
            catch (e) {
                // the listener failed.
                // In this case, we may want to retry the handler at the next cycle.
                this.deferredListeners.enqueue({ event: event, listen });
            }
        }
    }

    /**
     * transmit()
     * 
     * transmits an event.
     * @param event 
     */

    public async transmit(event: TransmittedEvent): Promise<void> {
        // process the deferred events.


        // process the new event.
        const eventSigniture = this.getEventSigniture(event.eventClassification(), event.eventName());
        const listeners = this.listeners.get(eventSigniture);

        if (listeners) {
            // execute the event listeners.
            const data = <EventData>{
                body: event.eventBody(),
                classification: event.eventClassification(),
                id: event.eventId(),
                name: event.eventName(),
                occuredOn: event.occuredOn(),
                version: event.eventVersion(),
            };
            await this.processEvents(data, listeners);
        }
    }
}