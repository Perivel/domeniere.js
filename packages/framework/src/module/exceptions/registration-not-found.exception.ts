import { ModuleException } from "./module.exception";

/**
 * RegistrationNotFoundException
 */

 export class RegistrationNotFoundException extends ModuleException {
    constructor(message: string = "Registration Not Found Exception") {
        super(message);
    }
}