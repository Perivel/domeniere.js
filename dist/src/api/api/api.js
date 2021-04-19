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
        if (!domain_module_1.Domain.Service().has(utils_module_1.Logger)) {
            domain_module_1.Domain.Service().bindInstance(utils_module_1.Logger, logger);
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
    registerModule(module) {
        const path = module.path();
        const factories = module.factoryBindings();
        const repositories = module.repositoryInstances();
        const serviceBindings = module.serviceBindings();
        const serviceInstances = module.serviceInstances();
        // create the module.
        domain_module_1.Domain.CreateModule(path);
        // register the factories
        factories.forEach((factory, token) => {
            domain_module_1.Domain.Factory(path).bindFactory(token, factory);
        });
        // register repositories
        repositories.forEach((instance, token) => {
            domain_module_1.Domain.Repository(path).bindInstance(token, instance);
        });
        // register service binding
        serviceBindings.forEach((factory, token) => {
            domain_module_1.Domain.Service(path).bindFactory(token, factory);
        });
        // service instances
        serviceInstances.forEach((instance, token) => {
            domain_module_1.Domain.Service(path).bindInstance(token, instance);
        });
    }
}
exports.Api = Api;
