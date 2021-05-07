import { Aggregate } from "../aggregate/aggregate";
import { TimestampedResource, DateTime } from "@perivel/foundation";
import { Entity } from "../../entity/entity.module";
/**
 * DateTimeedAggregate
 *
 * DateTimeedAggregate defines an aggregate as a DateTimeed Resource.
 */
export declare abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {
    private readonly _createdOn;
    private _updatedOn;
    private _deletedOn;
    constructor(root: Entity, version?: number, created?: DateTime, updated?: DateTime, deleted?: DateTime | null);
    /**
     * createdOn()
     *
     * createdOn() gets the DateTime the entity was created on.
     */
    createdOn(): DateTime;
    /**
     * deletedOn()
     *
     * deletedOn() gets the DateTime the entity was deleted.
     */
    deletedOn(): DateTime | null;
    /**
     * updatedOn()
     *
     * updatedOn() gets the DateTime the entity was last updated on.
     */
    updatedOn(): DateTime;
    /**
     * commitStateChange()
     *
     * commitStateChange() informs the entity that a state change has occured.
     */
    protected commitStateChanges(): void;
    /**
     * setDeleted()
     *
     * setDeleted() sets the DateTime the resource was deleted.
     * @param DateTime The DateTime to set.
     */
    protected setDeleted(DateTime: DateTime): void;
}
//# sourceMappingURL=timestamped-aggregate.d.ts.map