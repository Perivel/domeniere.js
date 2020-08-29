import { Aggregate } from "../aggregate/aggregate";
import { Timestamp } from "foundation";
export class TimestampedAggregate extends Aggregate {
    constructor(root, created = Timestamp.Now(), updated = Timestamp.Now(), deleted = null) {
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
        this._updatedOn = Timestamp.Now();
    }
    setDeleted(timestamp) {
        this._deletedOn = timestamp;
    }
}
