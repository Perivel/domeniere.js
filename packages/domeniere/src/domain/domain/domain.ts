import { VerdicContainer } from 'verdic';
import { EventStream } from '../../event/event.module';
import { DomainInterface } from "./domain.interface";

/**
 * Domain
 * 
 * Domain is the domain in whuch you application operates in. 
 */

export class Domain implements DomainInterface {

    private static _instance: Domain;

    // the container
    private readonly container: VerdicContainer;
    
    // the event stream
    private readonly _eventStream: EventStream;

    /**
     * We keep the constructor private because Domain is a singleton.
     */
    private constructor() {
        this.container = new VerdicContainer();
        this._eventStream = new EventStream();
    }

    /**
     * CreateModule()
     * 
     * creates a new module.
     * @param path The the path of the module to create.
     */

    public static CreateModule(path: string): void {
        Domain.instance().container.createModule(path);
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

    public static EventStream(): EventStream {
        return Domain.instance().eventStream();
    }

    /**
     * Module()
     * 
     * Module() gets a module specified by the path.
     * @param path The path of the module.
     * @returns the module specified by the path.
     */

    public static Module(path: string = ""): VerdicContainer {
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

    public static async PublishEvents(): Promise<void> {
        Domain.EventStream().publishEvents();
    }

    /**
     * eventStream()
     * 
     * eventStream() gets the event stream.
     */

    public eventStream(): EventStream {
        return this._eventStream;
    }
}