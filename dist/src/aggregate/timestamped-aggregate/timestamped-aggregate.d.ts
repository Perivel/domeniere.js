import { Aggregate } from "../aggregate/aggregate";
import { TimestampedResource, Timestamp } from "foundation";
import { Entity } from "../../entity/entity.module";
export declare abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(root: Entity, created?: Timestamp, updated?: Timestamp, deleted?: Timestamp | null);
    createdOn(): Timestamp;
    deletedOn(): Timestamp | null;
    updatedOn(): Timestamp;
    protected commitStateChange(): void;
    protected setDeleted(timestamp: Timestamp): void;
}
//# sourceMappingURL=timestamped-aggregate.d.ts.map