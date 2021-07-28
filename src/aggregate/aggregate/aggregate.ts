import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "../../entity/entity.module";
import { InvalidArgumentException, Serializable } from "swindle";
import { Identifier } from "../../common/common.module";

/**
 * Aggregate 
 * 
 * Aggregate is a cluster of objects and entities, centered 
 * around a root entity, that is required to fulfill some 
 * boundary of consistency.
 */


export abstract class Aggregate implements AggregateInterface, Serializable {

    private _root: Entity;
    private __committed_ver__: number;
    private __confirmed_ver__: number;

    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */

    constructor(root: Entity, version: number = 1.0) {

        if (!root) {
            // root is undefined.
            throw new InvalidArgumentException("An aggregate's root cannot be undefined.");
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

    public confirmStateChanges(): void {
        this.__confirmed_ver__ = this.__committed_ver__;
    }

    /**
     * countUnconfirmedStateChanges()
     * 
     * gets the number of state changes that have not yet been confirmed.
     * @returns the number of unconfirmed state changes that the aggregate has.
     */

    public countUnconfirmedStateChanges(): number {
        return this.__committed_ver__ - this.__confirmed_ver__;
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

    /**
     * hasUnconfirmedStateChanges()
     * 
     * determines if the aggregate has unconfirmed state changes
     */

    public hasUnconfirmedStateChanges(): boolean {
        return this.__committed_ver__ != this.__confirmed_ver__;
    }

    public serialize(): string {
        return JSON.stringify({
            root: this.root().serialize(),
            data: this.serializeData(),
            version: this.version(),
        });
    }

    /**
     * serializeData()
     * 
     * serializes the data
     */
    protected abstract serializeData(): string;

    public toString(): string {
        return this.identity().toString();
    }

    /**
     * version()
     * 
     * gets the version of the aggregate.
     * @returns the version of the aggregate
     */

    public version(): number {
        return this.__committed_ver__;
    }


    // Helpers

    /**
     * commitStateChanges()
     * 
     * indicates that state changes have been made to the aggregate.
     */

    protected commitStateChanges(): void {
        this.__committed_ver__++;
    }

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