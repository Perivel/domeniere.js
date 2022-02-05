import { BaseException } from '@swindle/core';


 export class UserIdException extends BaseException {

    constructor(message: string = "User Id Error") {
        super(message);
    }
}