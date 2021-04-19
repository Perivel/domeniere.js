/**
 * Event Publisher
 * 
 * EventPublisher is the base class for an object that is able to publish events.
 * 
 */

import { Domain } from "../../../domain/domain.module";
import { DomainEvent } from "../../../event/event.module";


 export abstract class EventEmittingObject {

    constructor() {}

    
    protected async emit(event: DomainEvent): Promise<void> {
        await Domain.EventStream().emit(event);
    }
    
 }