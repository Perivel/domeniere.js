"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const container_1 = require("@swindle/container");
const event_1 = require("@domeniere/event");
const domain_exception_1 = require("../exceptions/domain.exception");
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
        this.container = new container_1.Container();
    }
    /**
     * CreateSubdomain()
     *
     * Creates a Subdomain within the domain.
     * @param name the name of the subdomain
     * @param eventStore the event store to be assigned to the subdomain.
     */
    static CreateSubdomain(name, eventStore = new event_1.DefaultEventStore()) {
        if (!Domain.ContainsModule(name)) {
            const frameworkStorageSubmodule = `${name}.__domeniere__`;
            Domain.CreateModule(frameworkStorageSubmodule);
            Domain.Module(frameworkStorageSubmodule).bindInstance(event_1.EventStream, new event_1.EventStream(eventStore));
        }
        else {
            throw new domain_exception_1.DomainException(`Subdomain '${name}'' already in use.`);
        }
    }
    /**
     * CreateModule()
     *
     * creates a new module.
     * @param path The the path of the module to create.
     */
    static CreateModule(path) {
        try {
            Domain.instance().container.createModule(path);
        }
        catch (e) {
            if (e instanceof container_1.InvalidModuleException) {
                throw new container_1.InvalidModuleException("Invalid Module: " + path);
            }
        }
    }
    /**
     * ContainsModule()
     *
     * determines if the module exists
     * @param path The path of the module.
     * @returns TRUE if the domain contains the module. FALSE otherwise.
     */
    static ContainsModule(path) {
        return Domain.instance().container.containsModule(path);
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
    static EventStream(context) {
        return Domain.Module(`${context}.__domeniere__`).get(event_1.EventStream);
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
        else {
            return Domain.instance().container.module(path);
        }
    }
    /**
     * PublishEvents()
     *
     * Publishes all the events in the event stream.
     */
    static async PublishEvents(context) {
        await Domain.Module(`${context}.__domeniere__`).get(event_1.EventStream).publishEvents();
    }
}
exports.Domain = Domain;
//# sourceMappingURL=domain.js.map