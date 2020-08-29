import { Timestamp, TimestampedResource } from 'foundation';
import { Entity } from "../entity/entity";
import { Identifier } from '../../common/interfaces/identifier.interface';
export declare abstract class TimestampedEntity extends Entity implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(id: Identifier, created?: Timestamp, updated?: Timestamp, deleted?: Timestamp | null);
    createdOn(): Timestamp;
    deletedOn(): Timestamp | null;
    updatedOn(): Timestamp;
    protected commitStateChange(): void;
    protected setDeleted(timestamp: Timestamp): void;
    protected setId(id: Identifier): void;
}
//# sourceMappingURL=timestamped-entity.d.ts.map