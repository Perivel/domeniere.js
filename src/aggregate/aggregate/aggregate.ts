import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "../../entity/entity.module";
import { InvalidArgumentException } from "foundation";
import { Identifier } from "../../common/common.module";

/**
 * Aggregate
 * 
 * Aggregate is a cluster of objects and entities, centered 
 * around a root entity, that is required to fulfill some 
 * boundary of consistency.
 */


export abstract class Aggregate implements AggregateInterface {

    private _root: Entity;

    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */

    constructor(root: Entity) {

        if (!root) {
            // root is undefined.
            throw new InvalidArgumentException("An aggregate's root cannot be undefined.");
        }

        this._root = root;
    }

    /**
     * equals()
     * 
     * equals() compares the instance to the suspect, to deterine if they are equal.
     * @param suspect The suspect to be compared.
     */

    public equals(suspect: any): boolean {
        return this.root().equals(suspect);
    }

    /**
     * identity()
     * 
     * identity() gets the Identifier of the root.
     */

    public identity(): Identifier {
        return this.root().id();
    }


    // Helpers

    /**
     * root()
     * 
     * root() gets the aggregate root.
     */

    protected root(): Entity {
        return this._root;
    }

    /**
     * setRoot()
     * 
     * setRoot() sets the aggregate root.
     * @param root Entity
     * @throws InvalidArgumentException when the root is undefined.
     */

    protected setRoot(root: Entity): void {

        if (!root) {
            throw new InvalidArgumentException('An aggregate root cannot be undefined.');
        }

        this._root = root;
    }
}