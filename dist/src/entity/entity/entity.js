"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const foundation_1 = require("foundation");
class Entity {
    constructor(id) {
        if (!id) {
            throw new foundation_1.InvalidArgumentException("An entity's id cannot be undefined.");
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
exports.Entity = Entity;
