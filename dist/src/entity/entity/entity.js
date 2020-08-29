import { InvalidArgumentException } from "foundation";
export class Entity {
    constructor(id) {
        if (!id) {
            throw new InvalidArgumentException("An entity's id cannot be undefined.");
        }
        this._id = id;
    }
    id() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
}
