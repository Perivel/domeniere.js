
import { Domain } from '@domeniere/domain';
import { Module } from '@domeniere/module';
import {
    EventStore, 
    TransmittedEvent
} from "@domeniere/event";
import { ApiInterface } from "./api.interface";
import { Container } from '@swindle/container';

/**
 * ApplicationFragment
 * 
 * ApplicationFragment is an application service.
 */

export abstract class Api implements ApiInterface {

    /**
     * subdomainName
     * 
     * the name of the subdomain.
     */
    
    public readonly subdomainName: string;

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

    constructor(domainName: string, eventStore: EventStore) {
        this.subdomainName = domainName;
        Domain.CreateSubdomain(this.subdomainName, eventStore);
        this.domain = Domain.Module(this.subdomainName);
    }

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() broadcasts all unpublished events to the network.
     */

    public async broadcastEvents(): Promise<void> {
        await Domain.EventStream(this.subdomainName).publishEvents();
    }

    /**
     * initializeEvents()
     * 
     * initializes the service's state.
     */

    public async initializeEvents(): Promise<void> {
        await Domain.EventStream(this.subdomainName).initializeEvents();
    }

    /**
     * processTransmittedEvent()
     * 
     * processes a transmitted event.
     * @param event the event to intake.
     */

    public async processTransmittedEvent(event: TransmittedEvent): Promise<void> {
        await Domain.EventStream(this.subdomainName).processTransmittedEvent(event);
    }

    /**
     * registerModule()
     * 
     * registers a module.
     * @param module the module to register.
     */

    protected registerModule(module: Module): void {
        const path = `${this.subdomainName}.${module.path()}`;
        const factories = module.factoryBindings();
        const repositories = module.repositoryInstances();
        const serviceBindings = module.serviceBindings();
        const serviceInstances = module.serviceInstances();

        // create the module.
        if (!Domain.ContainsModule(path)) {
            Domain.CreateModule(path);
        }

        // register the factories
        factories.forEach((factory, token) => {
            if (!Domain.Module(path).has(token)) {
                Domain.Module(path).bindFactory(token, factory);
            }
        });

        // register repositories
        repositories.forEach((instance, token) => {
            if (!Domain.Module(path).has(token)) {
                Domain.Module(path).bindInstance(token, instance);
            }
        });

        // register service binding
        serviceBindings.forEach((factory, token) => {
            if (!Domain.Module(path).has(token)) {
                Domain.Module(path).bindFactory(token, factory);
            }
        });

        // service instances
        serviceInstances.forEach((instance, token) => {
            if (!Domain.Module(path).has(token)) {
                Domain.Module(path).bindInstance(token, instance);
            }
        });
    }
}