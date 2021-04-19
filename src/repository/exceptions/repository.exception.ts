import { BaseException } from '@perivel/foundation';

export class RepositoryException extends BaseException {
    
    constructor(message: string = "Repository Error") {
        super(message);
    }
}