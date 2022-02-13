import { TransmittedEvent } from '@domeniere/framework';
import { EventListener } from './event-listener.fn';

export interface TransmitterInterface {

    /**
     * listen()
     * 
     * creates an event listener.
     * @param eventClassification the event classification
     * @param eventName the event name.
     * @param listener the handler.
     * @throws any exception when the listener fails.
     */

    listen(eventClassification: string, eventName: string, listener: EventListener): void;

    /**
     * transmit()
     * 
     * transmits an event.
     * @param event 
     */
    
    transmit(event: TransmittedEvent): Promise<void>;
}