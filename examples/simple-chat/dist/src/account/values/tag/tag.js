"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const framework_1 = require("@domeniere/framework");
const exceptions_well_1 = require("../../exceptions/exceptions.well");
class Tag extends framework_1.Value {
    /**
     * @param value the value of the tag. Tags start with a '@' character.
     * @throws TagException when the tag is invalid.
     */
    constructor(value) {
        super();
        if ((value.length > 1) && (value.startsWith('@'))) {
            this._value = value;
        }
        else {
            throw new exceptions_well_1.TagException();
        }
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Tag) {
            const other = suspect;
            isEqual = this.value() === other.value();
        }
        return isEqual;
    }
    serialize() {
        return this.value();
    }
    /**
     * value()
     *
     * gets the value of the tag.
     */
    value() {
        return this._value;
    }
}
exports.Tag = Tag;
