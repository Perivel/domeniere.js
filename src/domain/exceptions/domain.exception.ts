import { BaseException } from 'foundation';

/**
 * DomainException
 * 
 * A generic domain exception.
 */

export class DomainException extends BaseException {
    constructor(message: string = "Domain Error") {
        super(message);
    }
}