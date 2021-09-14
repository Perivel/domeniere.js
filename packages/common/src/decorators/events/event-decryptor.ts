

/**
 * a custom property decriptor designed to take in only event responder function signitures.
 */

import { DomainEventHandler } from "@domeniere/event";

export interface EventDescriptor extends PropertyDescriptor {
    value?: DomainEventHandler
}