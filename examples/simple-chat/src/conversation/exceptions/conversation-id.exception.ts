import { BaseException } from '@swindle/core';


 export class ConversationIdException extends BaseException {

    constructor(message: string = "Conversation Id Error") {
        super(message);
    }
}