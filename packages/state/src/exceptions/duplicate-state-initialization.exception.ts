import { StateException } from "./state.exception";

export class DuplicateStateInitializationException extends StateException {
    constructor(message: string = "Duplicate State Initialization Error") {
        super(message);
    }
}