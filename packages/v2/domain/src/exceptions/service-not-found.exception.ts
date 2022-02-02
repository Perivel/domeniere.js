import { DomainException } from "./domain.exception";

/**
 * ServiceNotFoundException
 * 
 * ServiceNotFoundException 
 */

export class ServiceNotFoundException extends DomainException {
    constructor(message: string = "Service Not Found") {
        super(message);
    }
}