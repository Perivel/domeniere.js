import { BaseException } from '@swindle/core';


 export class MessageIdException extends BaseException {

    constructor(message: string = "Message Id Error") {
        super(message);
    }
}