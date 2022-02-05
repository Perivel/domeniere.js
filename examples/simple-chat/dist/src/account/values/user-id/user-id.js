"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
const exceptions_well_1 = require("../../exceptions/exceptions.well");
/**
 * UserId
 *
 * A User Id.
 */
class UserId extends framework_1.Value {
    /**
     * @param value the value of the id.
     * @throws UserIdException when the id is invalid.
     */
    constructor(value) {
        super();
        try {
            const id = new core_1.UUID(value);
            this._value = id.id();
        }
        catch (e) {
            throw new exceptions_well_1.UserIdException();
        }
    }
    /**
     * Generate()
     *
     * generates a UserId.
     * @returns the generated UserId
     */
    static Generate() {
        return new UserId(core_1.UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof UserId) {
            const other = suspect;
            isEqual = this.id() === other.id();
        }
        return isEqual;
    }
    id() {
        return this._value;
    }
    serialize() {
        return this.id();
    }
}
exports.UserId = UserId;
