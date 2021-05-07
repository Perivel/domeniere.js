"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedAggregate = void 0;
const aggregate_1 = require("../aggregate/aggregate");
const foundation_1 = require("@perivel/foundation");
/**
 * DateTimeedAggregate
 *
 * DateTimeedAggregate defines an aggregate as a DateTimeed Resource.
 */
class TimestampedAggregate extends aggregate_1.Aggregate {
    constructor(root, version = 1.0, created = foundation_1.DateTime.Now(), updated = foundation_1.DateTime.Now(), deleted = null) {
        try {
            super(root, version);
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
    createdOn() {
        return this._createdOn;
    }
    /**
     * deletedOn()
     *
     * deletedOn() gets the DateTime the entity was deleted.
     */
    deletedOn() {
        return this._deletedOn;
    }
    /**
     * updatedOn()
     *
     * updatedOn() gets the DateTime the entity was last updated on.
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
    commitStateChanges() {
        super.commitStateChanges();
        this._updatedOn = foundation_1.DateTime.Now();
    }
    /**
     * setDeleted()
     *
     * setDeleted() sets the DateTime the resource was deleted.
     * @param DateTime The DateTime to set.
     */
    setDeleted(DateTime) {
        this._deletedOn = DateTime;
    }
}
exports.TimestampedAggregate = TimestampedAggregate;
