import { TimestampedResource, DateTime } from "@swindle/core";
import { Entity } from "@domeniere/entity";
import { Aggregate } from "../aggregate/aggregate";


/**
 * DateTimeedAggregate
 * 
 * DateTimeedAggregate defines an aggregate as a DateTimeed Resource.
 */

export abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {

    private static CREATED_ON_ID = "__created_on__";
    private static UPDATED_ON_ID = "__updated_on__";
    private static DELETED_ON_ID = "__deleted_on__";

    constructor(root: Entity, version: number = 1.0, created: DateTime = DateTime.Now(), updated: DateTime = DateTime.Now(), deleted: DateTime | null = null) {
        try {
            super(root, version);
            this.__state__.initialize(TimestampedAggregate.CREATED_ON_ID, created);
            this.__state__.initialize(TimestampedAggregate.UPDATED_ON_ID, updated);
            this.__state__.initialize(TimestampedAggregate.DELETED_ON_ID, deleted);
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
     * createdOn() gets the DateTime the entity was created on.
     */

    public createdOn(): DateTime {
        return this.__state__.get(TimestampedAggregate.CREATED_ON_ID);
    }

    /**
     * deletedOn()
     * 
     * deletedOn() gets the DateTime the entity was deleted.
     */

    public deletedOn(): DateTime | null {
        return this.__state__.get(TimestampedAggregate.DELETED_ON_ID);
    }

    /**
     * updatedOn()
     * 
     * updatedOn() gets the DateTime the entity was last updated on.
     */

    public updatedOn(): DateTime {
        return this.__state__.get(TimestampedAggregate.UPDATED_ON_ID);
    }

    // internal helper methods.

    /**
     * commitStateChange()
     * 
     * commitStateChange() informs the entity that a state change has occured.
     */

    protected commitStateChanges(): void {
        super.commitStateChanges();
        this.__state__.set(TimestampedAggregate.UPDATED_ON_ID, DateTime.Now());
    }

    /**
     * setDeleted()
     * 
     * setDeleted() sets the DateTime the resource was deleted.
     * @param date The DateTime to set.
     */

    protected setDeleted(date: DateTime) {
        this.__state__.set(TimestampedAggregate.DELETED_ON_ID, date);
    }
}