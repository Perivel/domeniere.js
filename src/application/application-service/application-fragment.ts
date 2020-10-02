import { EventEmittingObject } from "../../common/common.module";
import { EventStore, EventStream } from "../../event/event.module";
import { ConsoleLoggerDelegate } from './../../utils/utils.module';
import { Logger, LoggerDelegate } from "../../utils/utils.module";
import { ApplicationServiceInterface } from "./application-service.interface";

/**
 * ApplicationFragment
 * 
 * ApplicationFragment is an application service.
 */

export abstract class ApplicationFragment extends EventEmittingObject implements ApplicationServiceInterface {

    constructor(eventStore: EventStore, logDelegate: LoggerDelegate = new ConsoleLoggerDelegate(), eventBroadcastInterval: number = 2) {
        super();
        EventStream.instance().setEventStore(eventStore);
        EventStream.PublishEventsWithinInterval(eventBroadcastInterval);
        Logger.instance().setDelegate(logDelegate);
    }
}