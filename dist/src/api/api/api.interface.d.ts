/**
 * ApplicationServiceInterface.
 */
import { DateTime } from "@perivel/foundation";
import { StoredEvent } from "../../event/event.module";
export interface ApiInterface {
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    broadcastEvents(): Promise<void>;
    /**
     * getEventsWithinInterval()
     *
     * gets the domain events within the interval.
     * @param from the start date of events to look for.
     * @param to the end date of events to look for.
     */
    getEventsWithinInterval(from: DateTime, to: DateTime): Promise<Array<StoredEvent>>;
}
//# sourceMappingURL=api.interface.d.ts.map