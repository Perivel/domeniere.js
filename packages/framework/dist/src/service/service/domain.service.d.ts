import { DomainEvent } from "./../../event/event.module";
import { ServiceInterface } from './service.interface';
/**
 * Service
 *
 * Service represents a Domain Service
 */
export declare abstract class DomainService implements ServiceInterface {
    private static SUBDOMAIN_SEPARATOR;
    constructor();
    /**
     * emit()
     *
     * emits an event.
     * @param event the domain event to emit.
     */
    protected emit(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=domain.service.d.ts.map