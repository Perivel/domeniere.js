"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFragment = void 0;
const common_module_1 = require("../../common/common.module");
const event_module_1 = require("../../event/event.module");
const utils_module_1 = require("../../utils/utils.module");
class ApplicationFragment extends common_module_1.EventEmittingObject {
    constructor(eventStore, logDelegate) {
        super();
        event_module_1.EventStream.instance().setEventStore(eventStore);
        utils_module_1.Logger.instance().setDelegate(logDelegate);
    }
}
exports.ApplicationFragment = ApplicationFragment;
