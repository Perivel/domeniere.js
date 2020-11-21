import { DateTime, TimestampedResource } from 'foundation';
import { Entity } from "../entity/entity";
import { Identifier } from '../../common/interfaces/identifier.interface';
export declare abstract class TimestampedEntity extends Entity implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(id: Identifier, created?: DateTime, updated?: DateTime, deleted?: DateTime | null);
    createdOn(): DateTime;
    deletedOn(): DateTime | null;
    updatedOn(): DateTime;
    protected commitStateChange(): void;
    protected setDeleted(timestamp: DateTime): void;
    protected setId(id: Identifier): void;
}
//# sourceMappingURL=timestamped-entity.d.ts.map