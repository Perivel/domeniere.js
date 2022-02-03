import { BaseException } from '@swindle/core';

export class RepositoryException extends BaseException {
    
    constructor(message: string = "Repository Error") {
        super(message);
    }
}