import { DateTime, TimestampedResource } from '@swindle/core';
import { Identifier } from "./../../value/value.module";
import { Entity } from "../entity/entity";
/**
 * TimestampedEntity
 *
 * TimestampedEntity defines an entity as a TimestampedResource.
 */
export declare abstract class TimestampedEntity extends Entity implements TimestampedResource {
    private static CREATED_ON_ID;
    private static UPDATED_ON_ID;
    private static DELETED_ON_ID;
    /**
     * Creates a new instance of TimestampedEntity.
     * @param id The identifier of the entity.
     * @param created the timestamp when the entity was created.
     * @param updated the timestamp when the entity was last updated.
     * @param deleted the timestamp the entity was deleted.
     * @throws InvalidArgumentException when the id is undefined.
     */
    constructor(id: Identifier, created?: DateTime, updated?: DateTime, deleted?: DateTime | null);
    /**
     * createdOn()
     *
     * createdOn() gets the timestamp the entity was created on.
     */
    createdOn(): DateTime;
    protected commitStateChanges(): void;
    /**
     * deletedOn()
     *
     * deletedOn() gets the timestamp the entity was deleted.
     */
    deletedOn(): DateTime | null;
    /**
     * updatedOn()
     *
     * updatedOn() gets the timestamp the entity was last updated on.
     */
    updatedOn(): DateTime;
    /**
     * setDeleted()
     *
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */
    protected setDeleted(timestamp: DateTime): void;
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    protected setId(id: Identifier): void;
}
//# sourceMappingURL=timestamped-entity.d.ts.map