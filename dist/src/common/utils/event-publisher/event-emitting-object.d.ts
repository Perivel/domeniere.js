import { DomainEvent } from "../../../event/event.module";
export declare abstract class EventEmittingObject {
    constructor();
    protected emit(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=event-emitting-object.d.ts.map