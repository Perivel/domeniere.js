import { BaseException } from 'swindle';

/**
 * ModuleException
 */

export class ModuleException extends BaseException {
    constructor(message: string = "Module Exception") {
        super(message);
    }
}