import { EventEmittingObject } from "../../common/common.module";
import { EventStore } from "../../event/event.module";
import { LoggerDelegate } from "../../utils/utils.module";
import { ApplicationServiceInterface } from "./application-service.interface";
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
export declare abstract class ApplicationFragment extends EventEmittingObject implements ApplicationServiceInterface {
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
    constructor(eventStore: EventStore, logDelegate?: LoggerDelegate, eventBroadcastInterval?: number);
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    broadcastEvents(): Promise<void>;
}
//# sourceMappingURL=application-fragment.d.ts.map