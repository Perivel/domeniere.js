import { EventEmittingObject } from '../../common/common.module';
import { ServiceInterface } from './service.interface';

/**
 * Service
 * 
 * Service represents a Domain Service
 */

export abstract class DomainService extends EventEmittingObject implements ServiceInterface {
    constructor() {
        super();
    }
}