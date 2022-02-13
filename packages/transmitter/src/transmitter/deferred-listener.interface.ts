import { EventData } from "./event-data.interface";
import { EventListener } from './event-listener.fn';

/**
 * DeferredListener
 * 
 * A deferred listener is an event listener that is to be executed in the next cycle.
 */

export interface DeferredListener {
    event: EventData;
    listen: EventListener;
}