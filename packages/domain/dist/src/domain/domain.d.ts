import { Container } from '@swindle/container';
import { EventStore, EventStream } from '@domeniere/event';
import { DomainInterface } from "./domain.interface";
/**
 * Domain
 *
 * Domain is the domain in whuch you application operates in.
 */
export declare class Domain implements DomainInterface {
    private static _instance;
    private readonly container;
    /**
     * We keep the constructor private because Domain is a singleton.
     */
    private constructor();
    /**
     * CreateSubdomain()
     *
     * Creates a Subdomain within the domain.
     * @param name the name of the subdomain
     * @param eventStore the event store to be assigned to teh
     */
    static CreateSubdomain(name: string, eventStore: EventStore): void;
    /**
     * CreateModule()
     *
     * creates a new module.
     * @param path The the path of the module to create.
     */
    static CreateModule(path: string): void;
    /**
     * ContainsModule()
     *
     * determines if the module exists
     * @param path The path of the module.
     * @returns TRUE if the domain contains the module. FALSE otherwise.
     */
    static ContainsModule(path: string): boolean;
    /**
     * instance()
     *
     * instance() gets the instance of the context.
     * @returns the instance of the context.
     */
    private static instance;
    /**
     * EventStream()
     *
     * gets the domain event stream.
     * @returns the event stream.
     */
    static EventStream(context: string): EventStream;
    /**
     * Module()
     *
     * Module() gets a module specified by the path.
     * @param path The path of the module.
     * @returns the module specified by the path.
     */
    static Module(path?: string): Container;
    /**
     * PublishEvents()
     *
     * Publishes all the events in the event stream.
     */
    static PublishEvents(context: string): Promise<void>;
}
//# sourceMappingURL=domain.d.ts.map