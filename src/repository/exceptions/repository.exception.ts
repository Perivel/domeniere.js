import { BaseException } from 'swindle';

export class RepositoryException extends BaseException {
    
    constructor(message: string = "Repository Error") {
        super(message);
    }
}