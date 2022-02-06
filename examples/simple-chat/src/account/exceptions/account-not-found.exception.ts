import { BaseException } from '@swindle/core';


 export class AccountNotFoundException extends BaseException {

    constructor(message: string = "Account Not Found Error") {
        super(message);
    }
}