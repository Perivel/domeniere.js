import { VerdicContainer } from 'verdic';
import { EventStream } from '../../event/event.module';
import { DomainInterface } from "./domain.interface";
/**
 * Domain
 *
 * Domain is the domain in whuch you application operates in.
 */
export declare class Domain implements DomainInterface {
    private static _instance;
    private readonly container;
    private readonly _eventStream;
    /**
     * We keep the constructor private because Domain is a singleton.
     */
    private constructor();
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
    static EventStream(): EventStream;
    /**
     * Module()
     *
     * Module() gets a module specified by the path.
     * @param path The path of the module.
     * @returns the module specified by the path.
     */
    static Module(path?: string): VerdicContainer;
    /**
     * PublishEvents()
     *
     * Publishes all the events in the event stream.
     */
    static PublishEvents(): Promise<void>;
    /**
     * eventStream()
     *
     * eventStream() gets the event stream.
     */
    eventStream(): EventStream;
}
//# sourceMappingURL=domain.d.ts.map