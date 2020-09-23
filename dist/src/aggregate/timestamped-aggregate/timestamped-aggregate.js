"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedAggregate = void 0;
const aggregate_1 = require("../aggregate/aggregate");
const foundation_1 = require("foundation");
class TimestampedAggregate extends aggregate_1.Aggregate {
    constructor(root, created = foundation_1.Timestamp.Now(), updated = foundation_1.Timestamp.Now(), deleted = null) {
        try {
            super(root);
            this._createdOn = created;
            this._updatedOn = updated;
            this._deletedOn = deleted;
        }
        catch (err) {
            throw err;
        }
    }
    createdOn() {
        return this._createdOn;
    }
    deletedOn() {
        return this._deletedOn;
    }
    updatedOn() {
        return this._updatedOn;
    }
    commitStateChange() {
        this._updatedOn = foundation_1.Timestamp.Now();
    }
    setDeleted(timestamp) {
        this._deletedOn = timestamp;
    }
}
exports.TimestampedAggregate = TimestampedAggregate;
