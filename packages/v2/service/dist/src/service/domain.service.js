"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainService = void 0;
const domain_1 = require("@domeniere/domain");
/**
 * Service
 *
 * Service represents a Domain Service
 */
class DomainService {
    constructor() {
        //
    }
    /**
     * emit()
     *
     * emits an event.
     * @param event the domain event to emit.
     */
    async emit(event) {
        let subdomain = event.eventClassification().trim();
        if (subdomain.includes(DomainService.SUBDOMAIN_SEPARATOR)) {
            const indexOfSep = subdomain.indexOf(DomainService.SUBDOMAIN_SEPARATOR);
            subdomain = subdomain.substring(0, indexOfSep);
        }
        await domain_1.Domain.EventStream(subdomain).emit(event);
    }
}
exports.DomainService = DomainService;
DomainService.SUBDOMAIN_SEPARATOR = ":";
//# sourceMappingURL=domain.service.js.map