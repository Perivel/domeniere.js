import { EventData } from './event-data.interface';
/**
 * EventListener
 * 
 * An event listener function.
 */

export type EventListener = (data: EventData) => Promise<void>;