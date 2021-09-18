import { Container, InvalidModuleException } from '@swindle/container';
import { EventStore, EventStream } from '@domeniere/event';
import { DomainInterface } from "./domain.interface";
import { DomainException } from '../exceptions/domain.exception';

/**
 * Domain
 * 
 * Domain is the domain in whuch you application operates in. 
 */

export class Domain implements DomainInterface {

    private static _instance: Domain;

    // the container
    private readonly container: Container;

    /**
     * We keep the constructor private because Domain is a singleton.
     */

    private constructor() {
        this.container = new Container();
    }

    /**
     * CreateSubdomain()
     *
     * Creates a Subdomain within the domain.
     * @param name the name of the subdomain
     * @param eventStore the event store to be assigned to teh 
     */

    public static CreateSubdomain(name: string, eventStore: EventStore): void {
        if (!Domain.ContainsModule(name)) {
            const frameworkStorageSubmodule = `${name}.__domeniere__`;
            Domain.CreateModule(frameworkStorageSubmodule);
            Domain.Module(frameworkStorageSubmodule).bindInstance(EventStream, new EventStream(eventStore));
        }
        else {
            throw new DomainException(`Subdomain '${name}'' already in use.`);
        }
    }

    /**
     * CreateModule()
     * 
     * creates a new module.
     * @param path The the path of the module to create.
     */

    public static CreateModule(path: string): void {
        try {
            Domain.instance().container.createModule(path);
        }
        catch(e) {
            if (e instanceof InvalidModuleException) {
                throw new InvalidModuleException("Invalid Module: " + path);
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
    public static ContainsModule(path: string): boolean {
        return Domain.instance().container.containsModule(path);
    }

    /**
     * instance()
     * 
     * instance() gets the instance of the context.
     * @returns the instance of the context.
     */

    private static instance(): Domain {

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

    public static EventStream(context: string): EventStream {
        return Domain.Module(`${context}.__domeniere__`).get(EventStream);
    }

    /**
     * Module()
     * 
     * Module() gets a module specified by the path.
     * @param path The path of the module.
     * @returns the module specified by the path.
     */

    public static Module(path: string = ""): Container {
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

    public static async PublishEvents(context: string): Promise<void> {
        await Domain.Module(`${context}.__domeniere__`).get(EventStream).publishEvents();
    }
}