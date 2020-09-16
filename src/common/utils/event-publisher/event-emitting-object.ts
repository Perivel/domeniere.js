/**
 * Event Publisher
 * 
 * EventPublisher is the base class for an object that is able to publish events.
 * 
 */

import { DomainEvent, EventStream } from "../../../event/event.module";

 export abstract class EventEmittingObject {

    constructor() {}

    
    protected async emit(event: DomainEvent): Promise<void> {
        await EventStream.instance().emit(event);
    }
    
 }