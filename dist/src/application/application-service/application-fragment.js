"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFragment = void 0;
const common_module_1 = require("../../common/common.module");
const event_module_1 = require("../../event/event.module");
const utils_module_1 = require("./../../utils/utils.module");
const utils_module_2 = require("../../utils/utils.module");
class ApplicationFragment extends common_module_1.EventEmittingObject {
    constructor(eventStore, logDelegate = new utils_module_1.ConsoleLoggerDelegate(), eventBroadcastInterval = 2) {
        super();
        event_module_1.EventStream.instance().setEventStore(eventStore);
        event_module_1.EventStream.PublishEventsWithinInterval(eventBroadcastInterval);
        utils_module_2.Logger.instance().setDelegate(logDelegate);
    }
}
exports.ApplicationFragment = ApplicationFragment;
