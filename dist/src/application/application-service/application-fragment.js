"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFragment = void 0;
const common_module_1 = require("../../common/common.module");
const domain_module_1 = require("../../domain/domain.module");
const utils_module_1 = require("../../utils/utils.module");
/**
 * ApplicationFragment
 *
 * ApplicationFragment is an application service.
 */
class ApplicationFragment extends common_module_1.EventEmittingObject {
    /**
     * constructor()
     * @param eventStore The event store to use.
     * @param logger The logger to use.
     *
     * NOTE: Enabling eventBroadcastIntervals will create a CRON job. Some providers may not support application-defined
     * CRON jobs. In these situations, it may be preferrable to manually publish events using publishEvents() instead.
     */
    constructor(eventStore, logger = new utils_module_1.ConsoleLogger()) {
        super();
        domain_module_1.Domain.EventStream().setEventStore(eventStore);
        if (!domain_module_1.Domain.Has(utils_module_1.Logger)) {
            domain_module_1.Domain.RegisterInstance(utils_module_1.Logger, logger);
        }
    }
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    async broadcastEvents() {
        await domain_module_1.Domain.EventStream().publishEvents();
    }
}
exports.ApplicationFragment = ApplicationFragment;
