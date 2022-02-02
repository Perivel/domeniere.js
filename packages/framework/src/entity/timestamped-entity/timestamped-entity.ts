import { DateTime, TimestampedResource } from '@swindle/core';
import { Identifier } from "./../../value/value.module";
import { Entity } from "../entity/entity";

/**
 * TimestampedEntity
 * 
 * TimestampedEntity defines an entity as a TimestampedResource.
 */


export abstract class TimestampedEntity extends Entity implements TimestampedResource {

    private static CREATED_ON_ID = "__created_on__";
    private static UPDATED_ON_ID = "__updated_on__";
    private static DELETED_ON_ID = "__deleted_on__";

    /**
     * Creates a new instance of TimestampedEntity.
     * @param id The identifier of the entity.
     * @param created the timestamp when the entity was created.
     * @param updated the timestamp when the entity was last updated.
     * @param deleted the timestamp the entity was deleted.
     * @throws InvalidArgumentException when the id is undefined.
     */

    constructor(id: Identifier, created: DateTime = DateTime.Now(), updated: DateTime = DateTime.Now(), deleted: DateTime | null = null) {
        try {
            super(id)
            this.__state__.initialize<DateTime>(TimestampedEntity.CREATED_ON_ID, created);
            this.__state__.initialize<DateTime>(TimestampedEntity.UPDATED_ON_ID, updated);
            this.__state__.initialize<DateTime|null>(TimestampedEntity.DELETED_ON_ID, deleted);
        }
        catch (err) {
            // The only error that can be thrown here is an InvalidArgumentException. This occurs when the id parameter passed to the 
            // super constructor is undefined.
            throw err;
        }
    }

    /**
     * createdOn()
     * 
     * createdOn() gets the timestamp the entity was created on.
     */

    public createdOn(): DateTime {
        return this.__state__.get(TimestampedEntity.CREATED_ON_ID);
    }

    protected commitStateChanges(): void {
        super.commitStateChanges();
        this.__state__.set(TimestampedEntity.UPDATED_ON_ID, DateTime.Now());
    }

    /**
     * deletedOn()
     * 
     * deletedOn() gets the timestamp the entity was deleted.
     */

    public deletedOn(): DateTime | null {
        return this.__state__.get(TimestampedEntity.DELETED_ON_ID);
    }

    /**
     * updatedOn()
     * 
     * updatedOn() gets the timestamp the entity was last updated on.
     */

    public updatedOn(): DateTime {
        return this.__state__.get(TimestampedEntity.UPDATED_ON_ID);
    }


    // internal helper methods.

    /**
     * setDeleted()
     * 
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */

    protected setDeleted(timestamp: DateTime) {
        this.__state__.set<DateTime>(TimestampedEntity.DELETED_ON_ID, timestamp);
    }

    /**
     * setId()
     * 
     * setId() sets the entity id.
     * @param id The id to set.
     */

    protected setId(id: Identifier): void {
        super.setId(id);
        this.commitStateChanges();
    }
}