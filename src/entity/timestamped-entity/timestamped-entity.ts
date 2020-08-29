import { Timestamp, TimestampedResource, Id } from 'foundation';
import { Entity } from "../entity/entity";

/**
 * TimestampedEntity
 * 
 * TimestampedEntity defines an entity as a TimestampedResource.
 */


export abstract class TimestampedEntity extends Entity implements TimestampedResource {

    private readonly _createdOn: Timestamp;
    private _updatedOn: Timestamp;
    private _deletedOn: Timestamp | null;

    /**
     * Creates a new instance of TimestampedEntity.
     * @param id The identifier of the entity.
     * @param created the timestamp when the entity was created.
     * @param updated the timestamp when the entity was last updated.
     * @param deleted the timestamp the entity was deleted.
     * @throws InvalidArgumentException when the id is undefined.
     */

    constructor(id: Id, created: Timestamp = Timestamp.Now(), updated: Timestamp = Timestamp.Now(), deleted: Timestamp | null = null) {
        try {
            super(id)
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

    /**
     * setId()
     * 
     * setId() sets the entity id.
     * @param id The id to set.
     */

    protected setId(id: Id): void {
        super.setId(id);
        this.commitStateChange();
    }
}