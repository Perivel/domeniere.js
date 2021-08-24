

import { ModuleException } from "./module.exception";

/**
 * DuplicateBindingException
 */

 export class DuplicateBindingException extends ModuleException {
    constructor(message: string = "Registration Not Found Exception") {
        super(message);
    }
}