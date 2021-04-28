import { EventEmittingObject } from "../../common/common.module";
import { Module } from './../../module/module.module';
import { EventStore, TransmittedEvent } from "../../event/event.module";
import { Logger } from "../../utils/utils.module";
import { ApiInterface } from "./api.interface";
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
export declare abstract class Api extends EventEmittingObject implements ApiInterface {
    /**
     * constructor()
     * @param eventStore The event store to use.
     * @param logger The logger to use.
     */
    constructor(eventStore: EventStore, logger?: Logger);
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