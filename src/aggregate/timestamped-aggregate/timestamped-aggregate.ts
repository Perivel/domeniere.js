import { Aggregate } from "../aggregate/aggregate";
import { TimestampedResource, Timestamp } from "foundation";
import { Entity } from "../../entity/entity.module";

/**
 * TimestampedAggregate
 * 
 * TimestampedAggregate defines an aggregate as a Timestamped Resource.
 */

export abstract class TimestampedAggregate extends Aggregate implements TimestampedResource {

    private readonly _createdOn: Timestamp;
    private _updatedOn: Timestamp;
    private _deletedOn: Timestamp | null;

    constructor(root: Entity, created: Timestamp = Timestamp.Now(), updated: Timestamp = Timestamp.Now(), deleted: Timestamp | null = null) {
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
     * createdOn() gets the timestamp the entity was created on.
     */

    public createdOn(): Timestamp {
        return this._createdOn;
    }

    /**
     * deletedOn()
     * 
     * deletedOn() gets the timestamp the entity was deleted.
     */

    public deletedOn(): Timestamp | null {
        return this._deletedOn;
    }

    /**
     * updatedOn()
     * 
     * updatedOn() gets the timestamp the entity was last updated on.
     */

    public updatedOn(): Timestamp {
        return this._updatedOn;
    }

    // internal helper methods.

    /**
     * commitStateChange()
     * 
     * commitStateChange() informs the entity that a state change has occured.
     */

    protected commitStateChange(): void {
        this._updatedOn = Timestamp.Now();
    }

    /**
     * setDeleted()
     * 
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */

    protected setDeleted(timestamp: Timestamp) {
        this._deletedOn = timestamp;
    }
}