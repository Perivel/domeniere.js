"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const foundation_1 = require("foundation");
/**
 * Entity
 *
 * An entity is a domain object with an established identity.
 */
class Entity {
    /**
     * creates a new entity instance.
     * @param id The entity identifier.
     * @throws InvalidArgumentException when the id is undefined.
     */
    constructor(id) {
        if (!id) {
            // id is undefined.
            throw new foundation_1.InvalidArgumentException("An entity's id cannot be undefined.");
        }
        this._id = id;
    }
    /**
     * id()
     *
     * id() gets the id value of the entity.
     */
    id() {
        return this._id;
    }
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    setId(id) {
        this._id = id;
    }
}
exports.Entity = Entity;
