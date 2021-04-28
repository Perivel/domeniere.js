"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const common_module_1 = require("../../common/common.module");
const domain_module_1 = require("../../domain/domain.module");
const utils_module_1 = require("../../utils/utils.module");
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
class Api extends common_module_1.EventEmittingObject {
    /**
     * constructor()
     * @param eventStore The event store to use.
     * @param logger The logger to use.
     */
    constructor(eventStore, logger = new utils_module_1.ConsoleLogger()) {
        super();
        domain_module_1.Domain.EventStream().setEventStore(eventStore);
        if (!domain_module_1.Domain.Module().has(utils_module_1.Logger)) {
            domain_module_1.Domain.Module().bindInstance(utils_module_1.Logger, logger);
        }
    }
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    async broadcastEvents() {
        await domain_module_1.Domain.EventStream().publishEvents();
    }
    /**
     * initializeEvents()
     *
     * initializes the service's state.
     */
    async initializeEvents() {
        await domain_module_1.Domain.EventStream().initializeEvents();
    }
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param event the event to intake.
     */
    async processTransmittedEvent(event) {
        await domain_module_1.Domain.EventStream().processTransmittedEvent(event);
    }
    /**
     * registerModule()
     *
     * registers a module.
     * @param module the module to register.
     */
    registerModule(module) {
        const path = module.path();
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
}
exports.Api = Api;
