
import { BaseException } from './../../common/common.module';

/**
 * DateException
 * 
 * DateException represents a generic date error.
 */

export class DateException extends BaseException {

    constructor(message: string = "Date error.") {
        super(message);
    }
}