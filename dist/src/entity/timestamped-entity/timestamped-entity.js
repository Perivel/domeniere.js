"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedEntity = void 0;
const foundation_1 = require("foundation");
const entity_1 = require("../entity/entity");
class TimestampedEntity extends entity_1.Entity {
    constructor(id, created = foundation_1.Timestamp.Now(), updated = foundation_1.Timestamp.Now(), deleted = null) {
        try {
            super(id);
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
    setId(id) {
        super.setId(id);
        this.commitStateChange();
    }
}
exports.TimestampedEntity = TimestampedEntity;
