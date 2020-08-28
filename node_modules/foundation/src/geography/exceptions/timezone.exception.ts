import { BaseException } from './../../common/exceptions/base.exception';

/**
 * TimezoneException
 * 
 * TimezoneException represents a generic timezone error.
 */

export class TimezoneException extends BaseException {

    constructor(message: string = "Timezone error.") {
        super(message);
    }
}