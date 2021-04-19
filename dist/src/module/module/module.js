"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const module_factory_entry_1 = require("../module-entry/module-factory-entry");
const module_instance_entry_1 = require("../module-entry/module-instance-entry");
const registration_not_found_exception_1 = require("../exceptions/registration-not-found.exception");
const duplicate_binding_exception_1 = require("../exceptions/duplicate-binding.exception");
/**
 * Module
 */
class Module {
    constructor(path) {
        this._path = path;
        this._factoryBindings = new Map();
        this._serviceBindings = new Map();
        this._repositoryInstances = new Map();
        this._serviceInstances = new Map();
        // register bindings
        this.createdBindings();
    }
    /**
     * factoryBindings()
     *
     * gets the module's factory bindings.
     */
    factoryBindings() {
        const factories = new Map();
        // create the bindings.
        this._factoryBindings.forEach(value => {
            factories.set(value.token(), value.factory());
        });
        return factories;
    }
    /**
     * path()
     *
     * gets the path of the module.
     */
    path() {
        return this._path;
    }
    /**
     * registerRepositoryInstance()
     *
     * registers a repository instance.
     * @param token The token to attach the instance to.
     * @param instance The instance to attach.
     * @throws RegistrationNotFoundException when there is no registration for the token
     */
    registerRepositoryInstance(token, instance) {
        const id = this.getIdFromToken(token);
        if (this._repositoryInstances.has(id)) {
            this._repositoryInstances.get(id).setInstance(instance);
        }
        else {
            throw new registration_not_found_exception_1.RegistrationNotFoundException(`No registration found for ${id}`);
        }
    }
    /**
     * regosterServoceInstance()
     *
     * registerServiceInstance() registers a service instance.
     * @param token the token to attach the instance to.
     * @param instance The instance to register.
     * @throws RegistrationNotFoundException when the service cannot be found.
     */
    registerServiceInstance(token, instance) {
        const id = this.getIdFromToken(token);
        if (this._serviceInstances.has(id)) {
            this._serviceInstances.get(id).setInstance(instance);
        }
        else {
            throw new registration_not_found_exception_1.RegistrationNotFoundException(`No registration found for ${id}`);
        }
    }
    /**
     * repositoryInstances()
     *
     * gets the repository instances.
     * @throws RegistrationNotFoundException when the registration token is not found
     * @throws RegistrationNotFoundException when there is a missing instance binding.
     */
    repositoryInstances() {
        const instances = new Map();
        this._repositoryInstances.forEach((value, key) => {
            if (value.hasInstance()) {
                instances.set(value.token(), value.instance());
            }
            else {
                throw new registration_not_found_exception_1.RegistrationNotFoundException(`No instance declared for ${this.getIdFromToken(value.token())}`);
            }
        });
        return instances;
    }
    /**
     * serviceBindings()
     *
     * gets the service bindings for the module.
     */
    serviceBindings() {
        const services = new Map();
        // build bindings
        this._serviceBindings.forEach((value, key) => {
            services.set(value.token(), value.factory());
        });
        return services;
    }
    /**
     * serviceInstances()
     *
     * gets the service instances.
     * @throws UndefinedInstanceBindingException
     */
    serviceInstances() {
        const instances = new Map();
        this._serviceInstances.forEach((value, key) => {
            if (value.hasInstance()) {
                instances.set(value.token(), value.instance());
            }
            else {
                // no instance
                throw new registration_not_found_exception_1.RegistrationNotFoundException(`No instance declared for ${this.getIdFromToken(value.token())}`);
            }
        });
        return instances;
    }
    // ==============================
    // Helper functions
    // ==============================
    /**
     * addFactoryBinding()
     *
     * adds a factory binding.
     * @param token the token
     * @param factory the factory.
     * @throw DuplicateBindingException when adding a duplicate binding.
     */
    addFactoryBinding(token, factory) {
        const id = this.getIdFromToken(token);
        if (!this._factoryBindings.has(id)) {
            const entry = new module_factory_entry_1.ModuleFactoryEntry(token, factory);
            this._factoryBindings.set(id, entry);
        }
        else {
            // binding already exists.
            throw new duplicate_binding_exception_1.DuplicateBindingException(`Duplicate Binding for token ${id}`);
        }
    }
    /**
     * addRepository()
     *
     * adds a repository entry to the module.
     * @param token the token to bind the repository to.
     * @throw DuplicateBindingException when attempting to add a duplicate repository entry.
     */
    addRepository(token) {
        const id = this.getIdFromToken(token);
        if (!this._repositoryInstances.has(id)) {
            const entry = new module_instance_entry_1.ModuleInstanceEntry(token);
            this._repositoryInstances.set(id, entry);
        }
        else {
            // duplicate repository.
            throw new duplicate_binding_exception_1.DuplicateBindingException(`Duplicate Binding for token ${id}`);
        }
    }
    /**
     * addServiceBinding()
     *
     * adds a service binding to the module.
     * @param token the token to bind the factory to.
     * @param factory the factory.
     */
    addServiceBinding(token, factory) {
        const id = this.getIdFromToken(token);
        if (!this._serviceBindings.has(id)) {
            const entry = new module_factory_entry_1.ModuleFactoryEntry(token, factory);
            this._serviceBindings.set(id, entry);
        }
        else {
            // duplicate entry.
            throw new duplicate_binding_exception_1.DuplicateBindingException(`Duplicate Binding for token ${id}`);
        }
    }
    /**
     * addServiceInstance()
     *
     * adds a service instance to the module.
     * @param token the token to register.
     * @throws DuplicateBindingException when attempting to register a service that already exists.
     *
     */
    addServiceInstance(token) {
        const id = this.getIdFromToken(token);
        if (!this._serviceInstances.has(id)) {
            const entry = new module_instance_entry_1.ModuleInstanceEntry(token);
            this._serviceInstances.set(id, entry);
        }
        else {
            // duplicate binding.
            throw new duplicate_binding_exception_1.DuplicateBindingException(`Duplicate Binding for token ${id}`);
        }
    }
    /**
     * getIdFromToken()
     *
     * getIdFromToken() gets the id for a token.
     * @param token the token to derrive the name from
     * @returns the id of the token.
     */
    getIdFromToken(token) {
        return token.name;
    }
}
exports.Module = Module;
