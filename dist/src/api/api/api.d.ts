import { EventEmittingObject } from "../../common/common.module";
import { Module } from './../../module/module.module';
import { EventStore, StoredEvent } from "../../event/event.module";
import { Logger } from "../../utils/utils.module";
import { ApiInterface } from "./api.interface";
import { DateTime } from "@perivel/foundation";
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
     * getEventsWithinInterval()
     *
     * gets the domain events within the interval.
     * @param from the start date of events to look for.
     * @param to the end date of events to look for.
     * @throws EventStoreException when there is an issue retrieving the events.
     */
    getEventsWithinInterval(from: DateTime, to?: DateTime): Promise<Array<StoredEvent>>;
    /**
     * registerModule()
     *
     * registers a module.
     * @param module the module to register.
     */
    protected registerModule(module: Module): void;
}
//# sourceMappingURL=api.d.ts.map