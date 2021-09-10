import { StateException } from "./state.exception";

/**
 * UndefinedStateException
 * 
 * An exception indicating some state value is not defined.
 */

export class UndefinedStateException extends StateException {

    constructor(message: string = "Undefined State") {
        super(message);
    }
}