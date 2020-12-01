"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFragment = void 0;
const common_module_1 = require("../../common/common.module");
const event_module_1 = require("../../event/event.module");
const utils_module_1 = require("./../../utils/utils.module");
const utils_module_2 = require("../../utils/utils.module");
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
class ApplicationFragment extends common_module_1.EventEmittingObject {
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
    constructor(eventStore, logDelegate = new utils_module_1.ConsoleLoggerDelegate(), eventBroadcastInterval = 0) {
        super();
        event_module_1.EventStream.instance().setEventStore(eventStore);
        utils_module_2.Logger.instance().setDelegate(logDelegate);
        if (eventBroadcastInterval > 0) {
            event_module_1.EventStream.PublishEventsWithinInterval(eventBroadcastInterval);
        }
    }
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    async broadcastEvents() {
        await event_module_1.EventStream.PublishEvents();
    }
}
exports.ApplicationFragment = ApplicationFragment;
