import { EventEmittingObject } from "../../common/common.module";
import { EventStore } from "../../event/event.module";
import { LoggerDelegate } from "../../utils/utils.module";
import { ApplicationServiceInterface } from "./application-service.interface";
export declare abstract class ApplicationFragment extends EventEmittingObject implements ApplicationServiceInterface {
    constructor(eventStore: EventStore, logDelegate?: LoggerDelegate, eventBroadcastInterval?: number);
}
//# sourceMappingURL=application-fragment.d.ts.map