
import { EventEmittingObject } from "../../common/common.module";
import { Domain } from '../../domain/domain.module';
import { Module } from './../../module/module.module';
import {
    EventStore, TransmittedEvent
} from "../../event/event.module";
import { Logger, ConsoleLogger } from "../../utils/utils.module";
import { ApiInterface } from "./api.interface";

/**
 * ApplicationFragment
 * 
 * ApplicationFragment is an application service.
 */

export abstract class Api extends EventEmittingObject implements ApiInterface {

    /**
     * constructor() 
     * @param eventStore The event store to use.
     * @param logger The logger to use.
     */

    constructor(eventStore: EventStore, logger: Logger = new ConsoleLogger()) {
        super();
        Domain.EventStream().setEventStore(eventStore);

        if (!Domain.Module().has(Logger)) {
            Domain.Module().bindInstance(Logger, logger);
        }
    }

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() broadcasts all unpublished events to the network.
     */

    public async broadcastEvents(): Promise<void> {
        await Domain.EventStream().publishEvents();
    }

    /**
     * processTransmittedEvent()
     * 
     * processes a transmitted event.
     * @param event the event to intake.
     */

    public async processTransmittedEvent(event: TransmittedEvent): Promise<void> {
        await Domain.EventStream().processTransmittedEvent(event);
    }

    /**
     * registerModule()
     * 
     * registers a module.
     * @param module the module to register.
     */

    protected registerModule(module: Module): void {
        const path = module.path();
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