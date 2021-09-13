import { Domain } from "@domeniere/domain";
import { DomainEvent } from "@domeniere/event";
import { ServiceInterface } from './service.interface';

/**
 * Service
 * 
 * Service represents a Domain Service
 */

export abstract class DomainService implements ServiceInterface {

    private static SUBDOMAIN_SEPARATOR = ":";

    constructor() {
        //
    }

    /**
     * emit()
     * 
     * emits an event.
     * @param event the domain event to emit.
     */

    protected async emit(event: DomainEvent): Promise<void> {
        let subdomain = event.eventClassification().trim();
        
        if (subdomain.includes(DomainService.SUBDOMAIN_SEPARATOR)) {
            const indexOfSep = subdomain.indexOf(DomainService.SUBDOMAIN_SEPARATOR);
            subdomain = subdomain.substring(0, indexOfSep);
        }
        await Domain.EventStream(subdomain).emit(event);
    }
}