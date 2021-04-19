import { BaseException } from '@perivel/foundation';

/**
 * ModuleException
 */

export class ModuleException extends BaseException {
    constructor(message: string = "Module Exception") {
        super(message);
    }
}