import { Aggregate } from "../aggregate/aggregate";
import { TimestampedResource, DateTime } from "foundation";
import { Entity } from "../../entity/entity.module";
export declare abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(root: Entity, created?: DateTime, updated?: DateTime, deleted?: DateTime | null);
    createdOn(): DateTime;
    deletedOn(): DateTime | null;
    updatedOn(): DateTime;
    protected commitStateChange(): void;
    protected setDeleted(DateTime: DateTime): void;
}
//# sourceMappingURL=timestamped-aggregate.d.ts.map