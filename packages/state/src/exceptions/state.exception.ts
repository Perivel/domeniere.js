import { BaseException } from "@swindle/core";

/**
 * StateException
 * 
 * A generate state exception.
 */

export class StateException extends BaseException {

    constructor(message: string = "State Error") {
        super(message);
    }
}