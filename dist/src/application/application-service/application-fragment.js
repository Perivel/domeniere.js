import { EventEmittingObject } from "../../common/common.module";
import { EventStream } from "../../event/event.module";
import { Logger } from "../../utils/utils.module";
export class ApplicationFragment extends EventEmittingObject {
    constructor(eventStore, logDelegate) {
        super();
        EventStream.instance().setEventStore(eventStore);
        Logger.instance().setDelegate(logDelegate);
    }
}
