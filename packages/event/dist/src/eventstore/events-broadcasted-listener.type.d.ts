import { Queue } from "@swindle/structs";
import { DomainEvent } from "../domain-event/domain-event";
/**
 * A handler type for a listener to be executed whenever events have been successfully broadcasted.
 */
export declare type EventsBradcastedListenerFn = (events: Queue<DomainEvent>) => Promise<void>;
//# sourceMappingURL=events-broadcasted-listener.type.d.ts.map