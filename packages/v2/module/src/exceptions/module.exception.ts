import { BaseException } from '@swindle/core';

/**
 * ModuleException
 */

export class ModuleException extends BaseException {
    constructor(message: string = "Module Exception") {
        super(message);
    }
}