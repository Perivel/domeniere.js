"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const core_1 = require("@swindle/core");
const state_1 = require("@domeniere/state");
/**
 * Aggregate
 *
 * Aggregate is a cluster of objects and entities, centered
 * around a root entity, that is required to fulfill some
 * boundary of consistency.
 */
class Aggregate {
    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */
    constructor(root, version = 1.0) {
        if (!root) {
            // root is undefined.
            throw new core_1.InvalidArgumentException("An aggregate's root cannot be undefined.");
        }
        this.__state__ = new state_1.State();
        this.__state__.initialize(Aggregate.ROOT_ID, root);
        this.__state__.initialize(Aggregate.VERSION_ID, version);
        this.__unconfirmed_changes__ = 0;
    }
    /**
     * confirmStateChanges()
     *
     * indicates that state changes have been confirmed.
     */
    confirmStateChanges() {
        this.root().confirmStateChanges();
        this.__state__.confirmChanges();
        this.__unconfirmed_changes__ = 0;
    }
    /**
     * unconfirmedStateChangeCount()
     *
     * gets the number of state changes that have not yet been confirmed.
     * @returns the number of unconfirmed state changes that the aggregate has.
     */
    unconfirmedStateChangeCount() {
        return this.__unconfirmed_changes__;
    }
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to deterine if they are equal.
     * @param suspect The suspect to be compared.
     */
    equals(suspect) {
        return this.root().equals(suspect);
    }
    /**
     * id()
     *
     * identity() gets the Identifier of the root.
     */
    id() {
        return this.root().id();
    }
    /**
     * hasUnconfirmedStateChanges()
     *
     * determines if the aggregate has unconfirmed state changes
     */
    hasUnconfirmedStateChanges() {
        return this.__unconfirmed_changes__ > 0;
    }
    /**
     * rollbackStatechanges()
     *
     * rolls back the committed state changes.
     */
    rollbackStateChanges() {
        this.root().rollbackStateChanges();
        this.__state__.discardChanges();
        this.__unconfirmed_changes__ = 0;
    }
    serialize() {
        return JSON.stringify({
            root: this.root().serialize(),
            data: this.serializeData(),
            version: this.version(),
        });
    }
    toString() {
        return this.id().toString();
    }
    /**
     * version()
     *
     * gets the version of the aggregate.
     * @returns the version of the aggregate
     */
    version() {
        return this.__state__.get(Aggregate.VERSION_ID);
    }
    // Helpers
    /**
     * commitStateChanges()
     *
     * indicates that state changes have been made to the aggregate.
     */
    commitStateChanges() {
        this.__state__.set(Aggregate.VERSION_ID, this.version() + 1);
        this.__unconfirmed_changes__++;
    }
    /**
     * root()
     *
     * root() gets the aggregate root.
     */
    root() {
        return this.__state__.get(Aggregate.ROOT_ID);
    }
    /**
     * setRoot()
     *
     * setRoot() sets the aggregate root.
     * @param root Entity
     * @throws InvalidArgumentException when the root is undefined.
     */
    setRoot(root) {
        if (!root) {
            throw new core_1.InvalidArgumentException('An aggregate root cannot be undefined.');
        }
        this.__state__.set(Aggregate.ROOT_ID, root);
    }
}
exports.Aggregate = Aggregate;
Aggregate.ROOT_ID = "__root__";
Aggregate.VERSION_ID = "__version__";
//# sourceMappingURL=aggregate.js.map