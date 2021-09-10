"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedEntity = void 0;
const core_1 = require("@swindle/core");
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
    constructor(id, created = core_1.DateTime.Now(), updated = core_1.DateTime.Now(), deleted = null) {
        try {
            super(id);
            this.__state__.initialize(TimestampedEntity.CREATED_ON_ID, created);
            this.__state__.initialize(TimestampedEntity.UPDATED_ON_ID, updated);
            this.__state__.initialize(TimestampedEntity.DELETED_ON_ID, deleted);
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
        return this.__state__.get(TimestampedEntity.CREATED_ON_ID);
    }
    commitStateChanges() {
        super.commitStateChanges();
        this.__state__.set(TimestampedEntity.UPDATED_ON_ID, core_1.DateTime.Now());
    }
    /**
     * deletedOn()
     *
     * deletedOn() gets the timestamp the entity was deleted.
     */
    deletedOn() {
        return this.__state__.get(TimestampedEntity.DELETED_ON_ID);
    }
    /**
     * updatedOn()
     *
     * updatedOn() gets the timestamp the entity was last updated on.
     */
    updatedOn() {
        return this.__state__.get(TimestampedEntity.UPDATED_ON_ID);
    }
    // internal helper methods.
    /**
     * setDeleted()
     *
     * setDeleted() sets the timestamp the resource was deleted.
     * @param timestamp The timestamp to set.
     */
    setDeleted(timestamp) {
        this.__state__.set(TimestampedEntity.DELETED_ON_ID, timestamp);
    }
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    setId(id) {
        super.setId(id);
        this.commitStateChanges();
    }
}
exports.TimestampedEntity = TimestampedEntity;
TimestampedEntity.CREATED_ON_ID = "__created_on__";
TimestampedEntity.UPDATED_ON_ID = "__updated_on__";
TimestampedEntity.DELETED_ON_ID = "__deleted_on__";
//# sourceMappingURL=timestamped-entity.js.map