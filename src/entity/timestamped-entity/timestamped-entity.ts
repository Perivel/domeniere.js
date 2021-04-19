import { DateTime, TimestampedResource } from 'foundation';
import { Entity } from "../entity/entity";
import { Identifier } from '../../common/interfaces/identifier.interface';

/**
 * TimestampedEntity
 * 
 * TimestampedEntity defines an entity as a TimestampedResource.
 */


export abstract class TimestampedEntity extends Entity implements TimestampedResource {

    private readonly _createdOn: DateTime;
    private _updatedOn: DateTime;
    private _deletedOn: DateTime | null;

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

    public createdOn(): DateTime {
        return this._createdOn;
    }

    /**
     * deletedOn()
     * 
     * deletedOn() gets the timestamp the entity was deleted.
     */

    public deletedOn(): DateTime | null {
        return this._deletedOn;
    }

    /**
     * updatedOn()
     * 
     * updatedOn() gets the timestamp the entity was last updated on.
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
    }

    /**
     * setDeleted()
     * 
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */

    protected setDeleted(timestamp: DateTime) {
        this._deletedOn = timestamp;
    }

    /**
     * setId()
     * 
     * setId() sets the entity id.
     * @param id The id to set.
     */

    protected setId(id: Identifier): void {
        super.setId(id);
        this.commitStateChange();
    }
}