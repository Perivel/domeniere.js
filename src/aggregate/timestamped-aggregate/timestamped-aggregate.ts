import { Aggregate } from "../aggregate/aggregate";
import { TimestampedResource, DateTime } from "foundation";
import { Entity } from "../../entity/entity.module";

/**
 * DateTimeedAggregate
 * 
 * DateTimeedAggregate defines an aggregate as a DateTimeed Resource.
 */

export abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {

    private readonly _createdOn: DateTime;
    private _updatedOn: DateTime;
    private _deletedOn: DateTime | null;

    constructor(root: Entity, created: DateTime = DateTime.Now(), updated: DateTime = DateTime.Now(), deleted: DateTime | null = null) {
        try {
            super(root);
            this._createdOn = created;
            this._updatedOn = updated;
            this._deletedOn = deleted;
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
        return this._createdOn;
    }

    /**
     * deletedOn()
     * 
     * deletedOn() gets the DateTime the entity was deleted.
     */

    public deletedOn(): DateTime | null {
        return this._deletedOn;
    }

    /**
     * updatedOn()
     * 
     * updatedOn() gets the DateTime the entity was last updated on.
     */

    public updatedOn(): DateTime {
        return this._updatedOn;
    }

    // internal helper methods.

    /**
     * commitStateChange()
     * 
     * commitStateChange() informs the entity that a state change has occured.
     */

    protected commitStateChange(): void {
        this._updatedOn = DateTime.Now();
        this.markDirty();
    }

    /**
     * setDeleted()
     * 
     * setDeleted() sets the DateTime the resource was deleted.
     * @param DateTime The DateTime to set.
     */

    protected setDeleted(DateTime: DateTime) {
        this._deletedOn = DateTime;
    }
}