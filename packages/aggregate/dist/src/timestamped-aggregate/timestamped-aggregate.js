"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedAggregate = void 0;
const core_1 = require("@swindle/core");
const aggregate_1 = require("../aggregate/aggregate");
/**
 * DateTimeedAggregate
 *
 * DateTimeedAggregate defines an aggregate as a DateTimeed Resource.
 */
class TimestampedAggregate extends aggregate_1.Aggregate {
    constructor(root, version = 1.0, created = core_1.DateTime.Now(), updated = core_1.DateTime.Now(), deleted = null) {
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
    createdOn() {
        return this.__state__.get(TimestampedAggregate.CREATED_ON_ID);
    }
    /**
     * deletedOn()
     *
     * deletedOn() gets the DateTime the entity was deleted.
     */
    deletedOn() {
        return this.__state__.get(TimestampedAggregate.DELETED_ON_ID);
    }
    /**
     * updatedOn()
     *
     * updatedOn() gets the DateTime the entity was last updated on.
     */
    updatedOn() {
        return this.__state__.get(TimestampedAggregate.UPDATED_ON_ID);
    }
    // internal helper methods.
    /**
     * commitStateChange()
     *
     * commitStateChange() informs the entity that a state change has occured.
     */
    commitStateChanges() {
        super.commitStateChanges();
        this.__state__.set(TimestampedAggregate.UPDATED_ON_ID, core_1.DateTime.Now());
    }
    /**
     * setDeleted()
     *
     * setDeleted() sets the DateTime the resource was deleted.
     * @param date The DateTime to set.
     */
    setDeleted(date) {
        this.__state__.set(TimestampedAggregate.DELETED_ON_ID, date);
    }
}
exports.TimestampedAggregate = TimestampedAggregate;
TimestampedAggregate.CREATED_ON_ID = "__created_on__";
TimestampedAggregate.UPDATED_ON_ID = "__updated_on__";
TimestampedAggregate.DELETED_ON_ID = "__deleted_on__";
//# sourceMappingURL=timestamped-aggregate.js.map