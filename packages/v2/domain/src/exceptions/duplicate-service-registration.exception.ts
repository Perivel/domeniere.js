import { DomainException } from "./domain.exception";

/**
 * DuplicateServiceRegistrationException
 * 
 * DuplicateServiceRegistrationException
 */

export class DuplicateServiceRegistrationException extends DomainException {
    constructor(message: string = "Duplicate Service Registration") {
        super(message);
    }
}