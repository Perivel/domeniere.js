import { EventEmittingObject } from "../../common/common.module";
import { EventStore } from "../../event/event.module";
import { Logger } from "../../utils/utils.module";
import { ApplicationServiceInterface } from "./application-service.interface";
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
export declare abstract class ApplicationFragment extends EventEmittingObject implements ApplicationServiceInterface {
    /**
     * constructor()
     * @param eventStore The event store to use.
     * @param logger The logger to use.
     *
     * NOTE: Enabling eventBroadcastIntervals will create a CRON job. Some providers may not support application-defined
     * CRON jobs. In these situations, it may be preferrable to manually publish events using publishEvents() instead.
     */
    constructor(eventStore: EventStore, logger?: Logger);
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    broadcastEvents(): Promise<void>;
}
//# sourceMappingURL=application-fragment.d.ts.map