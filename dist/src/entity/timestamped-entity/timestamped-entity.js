"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedEntity = void 0;
const foundation_1 = require("@perivel/foundation");
const entity_1 = require("../entity/entity");
/**
 * TimestampedEntity
 *
 * TimestampedEntity defines an entity as a TimestampedResource.
 */
class TimestampedEntity extends entity_1.Entity {
    /**
     * Creates a new instance of TimestampedEntity.
     * @param id The identifier of the entity.
     * @param created the timestamp when the entity was created.
     * @param updated the timestamp when the entity was last updated.
     * @param deleted the timestamp the entity was deleted.
     * @throws InvalidArgumentException when the id is undefined.
     */
    constructor(id, created = foundation_1.DateTime.Now(), updated = foundation_1.DateTime.Now(), deleted = null) {
        try {
            super(id);
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
    createdOn() {
        return this._createdOn;
    }
    /**
     * deletedOn()
     *
     * deletedOn() gets the timestamp the entity was deleted.
     */
    deletedOn() {
        return this._deletedOn;
    }
    /**
     * updatedOn()
     *
     * updatedOn() gets the timestamp the entity was last updated on.
     */
    updatedOn() {
        return this._updatedOn;
    }
    // internal helper methods.
    /**
     * commitStateChange()
     *
     * commitStateChange() informs the entity that a state change has occured.
     */
    commitStateChange() {
        this._updatedOn = foundation_1.DateTime.Now();
    }
    /**
     * setDeleted()
     *
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */
    setDeleted(timestamp) {
        this._deletedOn = timestamp;
    }
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    setId(id) {
        super.setId(id);
        this.commitStateChange();
    }
}
exports.TimestampedEntity = TimestampedEntity;
//# sourceMappingURL=timestamped-entity.js.map