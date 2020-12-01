"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const foundation_1 = require("foundation");
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
    constructor(root) {
        if (!root) {
            // root is undefined.
            throw new foundation_1.InvalidArgumentException("An aggregate's root cannot be undefined.");
        }
        this._root = root;
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
    // Helpers
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
            throw new foundation_1.InvalidArgumentException('An aggregate root cannot be undefined.');
        }
        this._root = root;
    }
}
exports.Aggregate = Aggregate;
