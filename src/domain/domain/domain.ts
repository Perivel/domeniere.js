import { VerdicContainer } from '@perivel/verdic';
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

    // constants
    //private static BASE_SERVICE_MODULE_NAME = "services";
    //private static BASE_FACTORY_MODULE_NAME = "factories"
    //private static BASE_REPOSITORY_MODULE_NAME = "repositories";

    /**
     * We keep the constructor private because Domain is a singleton.
     */
    private constructor() {
        this.container = new VerdicContainer();
        this._eventStream = new EventStream();
        //this.createBaseSubmodulesForModule();
    }

    /**
     * CreateModule()
     * 
     * creates a new module.
     * @param path The the path of the module to create.
     */

    public static CreateModule(path: string): void {
        Domain.instance().container.createModule(path);
        //Domain.instance().createBaseSubmodulesForModule(path);
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
     * Factory()
     * 
     * Factory() gets the factory container at the specified module.
     * @param modulePath The path of the module.
     * @returns The container that contains the factories specified by the modules. If the modulePath is omitted,
     * it defaults to the root module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */
    // public static Factory(modulePath: string = ''): VerdicContainer {
    //     const absolutePath = modulePath.length === 0 ? Domain.BASE_FACTORY_MODULE_NAME :`${modulePath}.${Domain.BASE_FACTORY_MODULE_NAME}`;
    //     return Domain.instance().container.module(absolutePath);
    // }

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
     * Repository()
     *
     * Repository() gets the repository container at the specified module. If modulePath is omitted,
     * it defaults to the root container.
     * @param modulePath the path to the module.
     * @returns the container containing the repositories in the specified module.
     * @throws ModuleNotFoundException when the specified module could not be found.
     * @throws InvalidModuleException when the module path is invalid.
     */

    // public static Repository(modulePath: string = ""): VerdicContainer {
    //     const absolutePath = modulePath.length === 0 ? Domain.BASE_REPOSITORY_MODULE_NAME : `${modulePath}.${Domain.BASE_REPOSITORY_MODULE_NAME}`;
    //     return Domain.instance().container.module(absolutePath);
    // }

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

    // public static Service(modulePath: string = ''): VerdicContainer {
    //     const absolutePath = modulePath.length === 0 ? Domain.BASE_SERVICE_MODULE_NAME : `${modulePath}.${Domain.BASE_SERVICE_MODULE_NAME}`;
    //     return Domain.instance().container.module(absolutePath);
    // }

    /**
     * eventStream()
     * 
     * eventStream() gets the event stream.
     */

    public eventStream(): EventStream {
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

    // private createBaseSubmodulesForModule(modulePath: string = ""): void {
    //     const absoluteFactoriesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_FACTORY_MODULE_NAME}` : Domain.BASE_FACTORY_MODULE_NAME;
    //     const absoluteRepositoriesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_REPOSITORY_MODULE_NAME}` : Domain.BASE_REPOSITORY_MODULE_NAME;
    //     const absoluteServicesPath = modulePath.length > 0 ? `${modulePath}.${Domain.BASE_SERVICE_MODULE_NAME}` : Domain.BASE_SERVICE_MODULE_NAME;

    //     if (!this.container.containsModule(absoluteFactoriesPath)) {
    //         this.container.createModule(absoluteFactoriesPath);
    //     }

    //     if (!this.container.containsModule(absoluteRepositoriesPath)) {
    //         this.container.createModule(absoluteRepositoriesPath);
    //     }

    //     if (!this.container.containsModule(absoluteServicesPath)) {
    //         this.container.createModule(absoluteServicesPath);
    //     }
    // }
}