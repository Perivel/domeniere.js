import { InvalidArgumentException } from '@perivel/foundation'


export class InvalidEventPublishIntervalException extends InvalidArgumentException {

    constructor(message: string = 'Invalid Event Broadcast Interval.') {
        super(message);
    }
}