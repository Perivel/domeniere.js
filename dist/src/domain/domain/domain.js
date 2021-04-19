"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const verdic_1 = require("@perivel/verdic");
const event_module_1 = require("../../event/event.module");
/**
 * Domain
 *
 * Domain is the domain in whuch you application operates in.
 */
class Domain {
    /**
     * We keep the constructor private because Domain is a singleton.
     */
    constructor() {
        this.container = new verdic_1.VerdicContainer();
        this._eventStream = new event_module_1.EventStream();
        this.createBaseSubmodulesForModule();
    }
    /**
     * CreateModule()
     *
     * creates a new module.
     * @param path The the path of the module to create.
     */
    static CreateModule(path) {
        Domain.instance().container.createModule(path);
        Domain.instance().createBaseSubmodulesForModule(path);
    }
    /**
     * instance()
     *
     * instance() gets the instance of the context.
     * @returns the instance of the context.
     */
    static instance() {
        if (!Domain._instance) {
            Domain._instance = new Domain();
        }
        return Domain._instance;
    }
    /**
     * EventStream()
     *
     * gets the domain event stream.
     * @returns the event stream.
     */
    static EventStream() {
        return Domain.instance().eventStream();
    }
    /**
     * Factory()
     *
     * Factory() gets the factory container at the specified module.
     * @param modulePath The path of the module.
     * @returns The container that contains the factories specified by the modules. If the modulePath is omitted,
     * it defaults to the root module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
    static Factory(modulePath = '') {
        const absolutePath = modulePath.length === 0 ? Domain.BASE_FACTORY_MODULE_NAME : `${modulePath}.${Domain.BASE_FACTORY_MODULE_NAME}`;
        return Domain.instance().container.module(absolutePath);
    }
    /**
     * Module()
     *
     * Module() gets a module specified by the path.
     * @param path The path of the module.
     * @returns the module specified by the path.
     */
    static Module(path = "") {
        if (path.length == 0) {
            return Domain.instance().container;
        }
        else
            return Domain.instance().container.module(path);
    }
    /**
     * PublishEvents()
     *
     * Publishes all the events in the event stream.
     */
    static async PublishEvents() {
        Domain.EventStream().publishEvents();
    }
    /**
     * Repository()
     *
     * Repository() gets the repository container at the specified module. If modulePath is omitted,
     * it defaults to the root container.
     * @param modulePath the path to the module.
     * @returns the container containing the repositories in the specified module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
    static Repository(modulePath = "") {
        const absolutePath = modulePath.length === 0 ? Domain.BASE_REPOSITORY_MODULE_NAME : `${modulePath}.${Domain.BASE_REPOSITORY_MODULE_NAME}`;
        return Domain.instance().container.module(absolutePath);
    }
    /**
     * Service()
     *
     * Service() gets the service container at the specified module. If modulePath is omitted,
     * it defaults to the root container.
     * @param modulePath the path to the module.
     * @returns the container containing the services in the specified module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
    static Service(modulePath = '') {
        const absolutePath = modulePath.length === 0 ? Domain.BASE_SERVICE_MODULE_NAME : `${modulePath}.${Domain.BASE_SERVICE_MODULE_NAME}`;
        return Domain.instance().container.module(absolutePath);
    }
    /**
     * eventStream()
     *
     * eventStream() gets the event stream.
     */
    eventStream() {
        return this._eventStream;
    }
    // ==================================
    // Helpers
    // ==================================
    /**
     * createBaseSubmodulesForModule()
     *
     * creates the base submodules for a given module.
     * @param modulePath the module path to create the submodules.
     */
    createBaseSubmodulesForModule(modulePath = "") {
        const absoluteFactoriesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_FACTORY_MODULE_NAME}` : Domain.BASE_FACTORY_MODULE_NAME;
        const absoluteRepositoriesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_REPOSITORY_MODULE_NAME}` : Domain.BASE_REPOSITORY_MODULE_NAME;
        const absoluteServicesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_SERVICE_MODULE_NAME}` : Domain.BASE_SERVICE_MODULE_NAME;
        if (!this.container.containsModule(absoluteFactoriesPath)) {
            this.container.createModule(absoluteFactoriesPath);
        }
        if (!this.container.containsModule(absoluteRepositoriesPath)) {
            this.container.createModule(absoluteRepositoriesPath);
        }
        if (!this.container.containsModule(absoluteServicesPath)) {
            this.container.createModule(absoluteServicesPath);
        }
    }
}
exports.Domain = Domain;
// constants
Domain.BASE_SERVICE_MODULE_NAME = "services";
Domain.BASE_FACTORY_MODULE_NAME = "factories";
Domain.BASE_REPOSITORY_MODULE_NAME = "repositories";
