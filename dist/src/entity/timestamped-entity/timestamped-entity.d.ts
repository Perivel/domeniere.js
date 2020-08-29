import { Timestamp, TimestampedResource, Id } from 'foundation';
import { Entity } from "../entity/entity";
export declare abstract class TimestampedEntity extends Entity implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(id: Id, created?: Timestamp, updated?: Timestamp, deleted?: Timestamp | null);
    createdOn(): Timestamp;
    deletedOn(): Timestamp | null;
    updatedOn(): Timestamp;
    protected commitStateChange(): void;
    protected setDeleted(timestamp: Timestamp): void;
    protected setId(id: Id): void;
}
//# sourceMappingURL=timestamped-entity.d.ts.map