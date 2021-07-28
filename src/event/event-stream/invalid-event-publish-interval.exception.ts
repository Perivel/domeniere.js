import { InvalidArgumentException } from 'swindle'


export class InvalidEventPublishIntervalException extends InvalidArgumentException {

    constructor(message: string = 'Invalid Event Broadcast Interval.') {
        super(message);
    }
}