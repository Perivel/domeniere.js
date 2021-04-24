import { VerdicContainer } from '@perivel/verdic';
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
     * Factory()
     *
     * Factory() gets the factory container at the specified module.
     * @param modulePath The path of the module.
     * @returns The container that contains the factories specified by the modules. If the modulePath is omitted,
     * it defaults to the root module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
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
     * Repository()
     *
     * Repository() gets the repository container at the specified module. If modulePath is omitted,
     * it defaults to the root container.
     * @param modulePath the path to the module.
     * @returns the container containing the repositories in the specified module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
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
    /**
     * eventStream()
     *
     * eventStream() gets the event stream.
     */
    eventStream(): EventStream;
}
//# sourceMappingURL=domain.d.ts.map