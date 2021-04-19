"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const foundation_1 = require("foundation");
const duplicate_service_registration_exception_1 = require("../exceptions/duplicate-service-registration.exception");
const service_not_found_exception_1 = require("../exceptions/service-not-found.exception");
/**
 * Context
 *
 * Context is the Bounded Context.
 */
class Context {
    constructor() {
        this.container = new foundation_1.DependencyContainer();
    }
    /**
     * instance()
     *
     * instance() gets the instance of the context.
     * @returns the instance of the context.
     */
    static instance() {
        if (!Context._instance) {
            Context._instance = new Context();
        }
        return Context._instance;
    }
    /**
     * Get()
     *
     * A convenience method to get the context service of the specified type.
     * @param service the service to get.
     * @returns the service to get.
     * @throws ServiceNotFoundException when the service cannot be found.
     */
    static Get(service) {
        return Context.instance().get(service);
    }
    /**
     * Has()
     *
     * a convenience method to determine if the context contains the specified service.
     * @param service The type of the service to get.
     * @returns TRUE if the context contains the service. FALSE otherwise.
     */
    static Has(service) {
        return Context.instance().has(service);
    }
    /**
     * RegisterInstance()
     *
     * a convenience method to register instances to the context.
     * @param service the service to register.
     * @param instance the instnace of the service to link.
     * @throws DuplicateServiceRegistrationException when attempting
     * to register a duplicate service.
     */
    static RegisterInstance(service, instance) {
        return Context.instance().registerInstance(service, instance);
    }
    /**
     * get()
     *
     * get() gets the instance of the given type from the context.
     * @param service the service type to get.
     * @throws ServiceNotFoundException when the service cannot be found.
     */
    get(service) {
        try {
            return this.container.get(service);
        }
        catch (e) {
            throw new service_not_found_exception_1.ServiceNotFoundException();
        }
    }
    /**
     * has()
     *
     * has() determines if the context has the specified service.
     * @param service The type of the service to check.
     */
    has(service) {
        return this.container.has(service);
    }
    /**
     * registerInstance()
     *
     * registerInstance() adds a given instance to the context.
     * @param service The type of the service to add.
     * @param instance the instance to add.
     * @throws DuplicateServiceRegistrationException when attempting
     * to register a duplicate service.
     */
    registerInstance(service, instance) {
        try {
            this.container.addInstance(service, instance);
        }
        catch (e) {
            throw new duplicate_service_registration_exception_1.DuplicateServiceRegistrationException();
        }
    }
}
exports.Context = Context;
