"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
require("reflect-metadata");
const domain_module_1 = require("./../domain/domain.module");
const constants_1 = require("./constants");
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
    constructor(subdomain, eventStore) {
        this.subdomainName = subdomain.trim();
        domain_module_1.Domain.CreateSubdomain(this.subdomainName);
        domain_module_1.Domain.EventStream(this.subdomainName).setEventStore(eventStore);
        this.domain = domain_module_1.Domain.Module(this.subdomainName);
        this.stream = domain_module_1.Domain.EventStream(this.subdomainName);
        // Register any events
        if (Reflect.hasMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, this)) {
            const registrations = Reflect.getMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, this);
            registrations.forEach(register => register(this, this.subdomainName));
        }
        // run the initialization logic.
        this.init();
    }
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    async broadcastEvents() {
        await this.stream.publishEvents();
    }
    /**
     * initializeEvents()
     *
     * initializes the service's state.
     */
    async initializeEvents() {
        await this.stream.initializeEvents();
    }
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param event the event to intake.
     */
    async processTransmittedEvent(event) {
        await this.stream.processTransmittedEvent(event);
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
        if (!domain_module_1.Domain.ContainsModule(path)) {
            domain_module_1.Domain.CreateModule(path);
        }
        // register the factories
        factories.forEach((factory, token) => {
            if (!domain_module_1.Domain.Module(path).has(token)) {
                domain_module_1.Domain.Module(path).bindFactory(token, factory);
            }
        });
        // register repositories
        repositories.forEach((instance, token) => {
            if (!domain_module_1.Domain.Module(path).has(token)) {
                domain_module_1.Domain.Module(path).bindInstance(token, instance);
            }
        });
        // register service binding
        serviceBindings.forEach((factory, token) => {
            if (!domain_module_1.Domain.Module(path).has(token)) {
                domain_module_1.Domain.Module(path).bindFactory(token, factory);
            }
        });
        // service instances
        serviceInstances.forEach((instance, token) => {
            if (!domain_module_1.Domain.Module(path).has(token)) {
                domain_module_1.Domain.Module(path).bindInstance(token, instance);
            }
        });
    }
    /**
     * init()
     *
     * performs some initialization operations.
     * This operation is run right after the domain has been initialized.
     * This is the ideal place to initialize things like additional event handlers.
     */
    init() {
        //
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map