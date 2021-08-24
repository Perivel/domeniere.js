"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const core_1 = require("@swindle/core");
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
        this._root = root;
        this.__committed_ver__ = version;
        this.__confirmed_ver__ = version;
    }
    /**
     * confirmStateChanges()
     *
     * indicates that state changes have been confirmed.
     */
    confirmStateChanges() {
        this.__confirmed_ver__ = this.__committed_ver__;
    }
    /**
     * countUnconfirmedStateChanges()
     *
     * gets the number of state changes that have not yet been confirmed.
     * @returns the number of unconfirmed state changes that the aggregate has.
     */
    countUnconfirmedStateChanges() {
        return this.__committed_ver__ - this.__confirmed_ver__;
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
     * identity()
     *
     * identity() gets the Identifier of the root.
     */
    identity() {
        return this.root().id();
    }
    /**
     * hasUnconfirmedStateChanges()
     *
     * determines if the aggregate has unconfirmed state changes
     */
    hasUnconfirmedStateChanges() {
        return this.__committed_ver__ != this.__confirmed_ver__;
    }
    serialize() {
        return JSON.stringify({
            root: this.root().serialize(),
            data: this.serializeData(),
            version: this.version(),
        });
    }
    toString() {
        return this.identity().toString();
    }
    /**
     * version()
     *
     * gets the version of the aggregate.
     * @returns the version of the aggregate
     */
    version() {
        return this.__committed_ver__;
    }
    // Helpers
    /**
     * commitStateChanges()
     *
     * indicates that state changes have been made to the aggregate.
     */
    commitStateChanges() {
        this.__committed_ver__++;
    }
    /**
     * root()
     *
     * root() gets the aggregate root.
     */
    root() {
        return this._root;
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
        this._root = root;
    }
}
exports.Aggregate = Aggregate;
//# sourceMappingURL=aggregate.js.map