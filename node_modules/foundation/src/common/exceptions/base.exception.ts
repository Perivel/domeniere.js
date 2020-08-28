

/**
 * BaseException
 *
 * DomainException represents a generic domain exception.
 */

export class BaseException extends Error {

    constructor(message: string = "A domain error occured.") {
        super(message);
    }
}