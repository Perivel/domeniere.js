"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const verdic_1 = require("verdic");
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
    }
    /**
     * CreateModule()
     *
     * creates a new module.
     * @param path The the path of the module to create.
     */
    static CreateModule(path) {
        Domain.instance().container.createModule(path);
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
    static EventStream() {
        return Domain.instance().eventStream();
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
    static async PublishEvents() {
        Domain.EventStream().publishEvents();
    }
    /**
     * eventStream()
     *
     * eventStream() gets the event stream.
     */
    eventStream() {
        return this._eventStream;
    }
}
exports.Domain = Domain;
//# sourceMappingURL=domain.js.map