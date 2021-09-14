import { Module } from '@domeniere/module';
import { EventStore, TransmittedEvent } from "@domeniere/event";
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
    private readonly subdomainName;
    /**
     * domain
     *
     * the current domain.
     */
    protected readonly domain: Container;
    /**
     * constructor()
     * @param eventStore The event store to use.
     */
    constructor(domainName: string, eventStore: EventStore);
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
}
//# sourceMappingURL=api.d.ts.map