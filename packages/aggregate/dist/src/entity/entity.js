"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const core_1 = require("@swindle/core");
const state_1 = require("@domeniere/state");
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
            throw new core_1.InvalidArgumentException("An entity's id cannot be undefined.");
        }
        this.__state__ = new state_1.State();
        this.__state__.initialize(Entity.ID_STATE_KEY, id);
    }
    /**
     * commitStateChange()
     *
     * commitStateChange() informs the entity that a state change has occured.
     */
    commitStateChanges() {
        //
    }
    /**
     * confirmStateChanges()
     *
     * confirms the state changes.
     */
    confirmStateChanges() {
        this.__state__.confirmChanges();
    }
    /**
     * id()
     *
     * id() gets the id value of the entity.
     */
    id() {
        return this.__state__.get(Entity.ID_STATE_KEY);
    }
    /**
     * rollbackStateChanges()
     *
     * rolls back the committed state changes.
     */
    rollbackStateChanges() {
        this.__state__.discardChanges();
    }
    serialize() {
        return JSON.stringify({
            id: this.id().id().toString(),
            data: this.serializeData(),
        });
    }
    toString() {
        return this.id().toString();
    }
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    setId(id) {
        this.__state__.set(Entity.ID_STATE_KEY, id);
    }
}
exports.Entity = Entity;
Entity.ID_STATE_KEY = "__id__";
//# sourceMappingURL=entity.js.map