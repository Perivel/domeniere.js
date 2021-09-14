"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const domain_1 = require("@domeniere/domain");
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
class Api {
    /**
     * constructor()
     * @param eventStore The event store to use.
     */
    constructor(domainName, eventStore) {
        this.subdomainName = domainName;
        domain_1.Domain.CreateSubdomain(this.subdomainName, eventStore);
        this.domain = domain_1.Domain.Module(this.subdomainName);
    }
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    async broadcastEvents() {
        await domain_1.Domain.EventStream(this.subdomainName).publishEvents();
    }
    /**
     * initializeEvents()
     *
     * initializes the service's state.
     */
    async initializeEvents() {
        await domain_1.Domain.EventStream(this.subdomainName).initializeEvents();
    }
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param event the event to intake.
     */
    async processTransmittedEvent(event) {
        await domain_1.Domain.EventStream(this.subdomainName).processTransmittedEvent(event);
    }
    /**
     * registerModule()
     *
     * registers a module.
     * @param module the module to register.
     */
    registerModule(module) {
        const path = `${this.subdomainName}.${module.path()}`;
        const factories = module.factoryBindings();
        const repositories = module.repositoryInstances();
        const serviceBindings = module.serviceBindings();
        const serviceInstances = module.serviceInstances();
        // create the module.
        if (!domain_1.Domain.ContainsModule(path)) {
            domain_1.Domain.CreateModule(path);
        }
        // register the factories
        factories.forEach((factory, token) => {
            if (!domain_1.Domain.Module(path).has(token)) {
                domain_1.Domain.Module(path).bindFactory(token, factory);
            }
        });
        // register repositories
        repositories.forEach((instance, token) => {
            if (!domain_1.Domain.Module(path).has(token)) {
                domain_1.Domain.Module(path).bindInstance(token, instance);
            }
        });
        // register service binding
        serviceBindings.forEach((factory, token) => {
            if (!domain_1.Domain.Module(path).has(token)) {
                domain_1.Domain.Module(path).bindFactory(token, factory);
            }
        });
        // service instances
        serviceInstances.forEach((instance, token) => {
            if (!domain_1.Domain.Module(path).has(token)) {
                domain_1.Domain.Module(path).bindInstance(token, instance);
            }
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map