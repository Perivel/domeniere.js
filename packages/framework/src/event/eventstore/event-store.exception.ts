import { BaseException } from "@swindle/core";

/**
 * EventStoreException
 * 
 * A generic Event Store Exception
 */

export class EventStoreException extends BaseException {
    constructor(message: string = "Event Store Error") {
        super(message);
    }
}