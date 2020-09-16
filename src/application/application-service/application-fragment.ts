import { EventEmittingObject } from "../../common/common.module";
import { EventStore, EventStream } from "../../event/event.module";
import { Logger, LoggerDelegate } from "../../utils/utils.module";
import { ApplicationServiceInterface } from "./application-service.interface";

/**
 * ApplicationFragment
 * 
 * ApplicationFragment is an application service.
 */

export abstract class ApplicationFragment extends EventEmittingObject implements ApplicationServiceInterface {

    constructor(eventStore: EventStore, logDelegate: LoggerDelegate) {
        super();
        EventStream.instance().setEventStore(eventStore);
        Logger.instance().setDelegate(logDelegate);
    }
}