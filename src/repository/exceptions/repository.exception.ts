import { BaseException } from 'foundation';

export class RepositoryException extends BaseException {
    
    constructor(message: string = "Repository Error") {
        super(message);
    }
}