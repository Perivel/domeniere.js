import "reflect-metadata";
import { Module, ModuleReference } from './../module/module.module';
import { EventStore, EventStream, TransmittedEvent } from "./../event/event.module";
import { ApiInterface } from "./api.interface";
import { Container } from '@swindle/container';
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
export declare abstract class Api implements ApiInterface {
    /**
     * subdomainName
     *
     * the name of the subdomain.
     */
    protected readonly subdomainName: string;
    /**
     * domain
     *
     * the current domain.
     * @deprecated domain property is deprecated and will be removed in a future update. Use the module() method instead.
     */
    protected readonly domain: Container;
    /**
     * The event Stream.
     */
    protected readonly stream: EventStream;
    /**
     * constructor()
     * @param eventStore The event store to use.
     */
    constructor(subdomain: string, eventStore: EventStore);
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    broadcastEvents(): Promise<void>;
    /**
     * initializeEvents()
     *
     * initializes the service's state.
     */
    initializeEvents(): Promise<void>;
    /**
     * module()
     *
     * Gets a reference to a module.
     * @param path the path of the module to get a reference to.
     * @returns A ModuleReference pointing to the module specified by the path.
     */
    module(path: string): ModuleReference;
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param event the event to intake.
     */
    processTransmittedEvent(event: TransmittedEvent): Promise<void>;
    /**
     * registerModule()
     *
     * registers a module.
     * @param module the module to register.
     */
    protected registerModule(module: Module): void;
    /**
     * init()
     *
     * performs some initialization operations.
     * This operation is run right after the domain has been initialized.
     * This is the ideal place to initialize things like additional event handlers.
     */
    protected init(): void;
}
//# sourceMappingURL=api.d.ts.map