import { BaseException } from '@swindle/core';


 export class TagException extends BaseException {

    constructor(message: string = "Tag Error") {
        super(message);
    }
}