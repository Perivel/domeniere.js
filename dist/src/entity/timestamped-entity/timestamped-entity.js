import { Timestamp } from 'foundation';
import { Entity } from "../entity/entity";
export class TimestampedEntity extends Entity {
    constructor(id, created = Timestamp.Now(), updated = Timestamp.Now(), deleted = null) {
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
        this._updatedOn = Timestamp.Now();
    }
    setDeleted(timestamp) {
        this._deletedOn = timestamp;
    }
    setId(id) {
        super.setId(id);
        this.commitStateChange();
    }
}
