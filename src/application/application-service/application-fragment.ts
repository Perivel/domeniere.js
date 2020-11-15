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

    /**
     * 
     * @param eventStore The event store to use.
     * @param logDelegate The log delegate to use.
     * @param eventBroadcastInterval the interval (in minutes) to automatically braodcast unpublished events.
     * This is completely optional. If you want to use automatic broadcasting, specify an interval in minutes 
     * greater than 0. 
     * 
     * NOTE: Enabling eventBroadcastIntervals will create a CRON job. Some providers may not support application-defined 
     * CRON jobs. In these situations, it may be preferrable to manually publish events using publishEvents() instead.
     */
    constructor(eventStore: EventStore, logDelegate: LoggerDelegate = new ConsoleLoggerDelegate(), eventBroadcastInterval: number = 0) {
        super();
        EventStream.instance().setEventStore(eventStore);
        Logger.instance().setDelegate(logDelegate);

        if (eventBroadcastInterval > 0) {
            EventStream.PublishEventsWithinInterval(eventBroadcastInterval);
        } 
    }

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    public async broadcastEvents(): Promise<void> {
        await EventStream.PublishEvents();
    }
}