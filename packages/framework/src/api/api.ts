import "reflect-metadata";
import { Domain } from './../domain/domain.module';
import { Module } from './../module/module.module';
import {
    EventStore, 
    EventStream, 
    TransmittedEvent
} from "./../event/event.module";
import { ApiInterface } from "./api.interface";
import { Container } from '@swindle/container';
import { EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, SUBDOMAIN_METADATA_KEY } from "./constants";
import { EventRegistrationCallbackFn } from "./event-registration-callback.type";

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
    
    protected readonly subdomainName: string;

    /**
     * domain
     * 
     * the current domain.
     */

    public readonly domain: Container;

    /**
     * The event Stream.
     */

    protected readonly stream: EventStream;

    /**
     * constructor() 
     * @param eventStore The event store to use.
     */

    constructor(subdomain: string, eventStore: EventStore) {
        this.subdomainName = subdomain.trim();
        Domain.CreateSubdomain(this.subdomainName);
        Domain.EventStream(this.subdomainName).setEventStore(eventStore);
        this.domain = Domain.Module(this.subdomainName);
        this.stream = Domain.EventStream(this.subdomainName);

        // Register any events
        if (Reflect.hasMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, this)) {
            const registrations: EventRegistrationCallbackFn[] = Reflect.getMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, this);
            registrations.forEach(register => register(this, this.subdomainName));
        }

        // run the initialization logic.
        this.init();
    }

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() broadcasts all unpublished events to the network.
     */

    public async broadcastEvents(): Promise<void> {
        await this.stream.publishEvents();
    }

    /**
     * initializeEvents()
     * 
     * initializes the service's state.
     */

    public async initializeEvents(): Promise<void> {
        await this.stream.initializeEvents();
    }

    /**
     * processTransmittedEvent()
     * 
     * processes a transmitted event.
     * @param event the event to intake.
     */

    public async processTransmittedEvent(event: TransmittedEvent): Promise<void> {
        await this.stream.processTransmittedEvent(event);
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

    /**
     * init()
     * 
     * performs some initialization operations.
     * This operation is run right after the domain has been initialized.
     * This is the ideal place to initialize things like additional event handlers.
     */

    protected init(): void {
        //
    }
}