import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "@domeniere/entity";
import { InvalidArgumentException, Serializable } from "@swindle/core";
import { Identifier } from "@domeniere/value";
import { State } from "@domeniere/state";

/**
 * Aggregate 
 * 
 * Aggregate is a cluster of objects and entities, centered 
 * around a root entity, that is required to fulfill some 
 * boundary of consistency.
 */


export abstract class Aggregate implements AggregateInterface, Serializable {

    private static ROOT_ID = "__root__";
    private static VERSION_ID = "__version__";

    public readonly __state__: State;
    private __unconfirmed_changes__: number;

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

        this.__state__ = new State();
        this.__state__.initialize(Aggregate.ROOT_ID, root);
        this.__state__.initialize(Aggregate.VERSION_ID, version);
        this.__unconfirmed_changes__ = 0;
    }

    /**
     * confirmStateChanges()
     * 
     * indicates that state changes have been confirmed.
     */

    public confirmStateChanges(): void {
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

    public unconfirmedStateChangeCount(): number {
        return this.__unconfirmed_changes__;
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
     * id()
     * 
     * identity() gets the Identifier of the root.
     */

    public id(): Identifier {
        return this.root().id();
    }

    /**
     * hasUnconfirmedStateChanges()
     * 
     * determines if the aggregate has unconfirmed state changes
     */

    public hasUnconfirmedStateChanges(): boolean {
        return this.__unconfirmed_changes__ > 0;
    }

    /**
     * rollbackStatechanges()
     * 
     * rolls back the committed state changes.
     */

    public rollbackStateChanges(): void {
        this.root().rollbackStateChanges();
        this.__state__.discardChanges();
        this.__unconfirmed_changes__ = 0;
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
        return this.id().toString();
    }

    /**
     * version()
     * 
     * gets the version of the aggregate.
     * @returns the version of the aggregate
     */

    public version(): number {
        return this.__state__.get(Aggregate.VERSION_ID);
    }


    // Helpers

    /**
     * commitStateChanges()
     * 
     * indicates that state changes have been made to the aggregate.
     */

    protected commitStateChanges(): void {
        this.__state__.set(Aggregate.VERSION_ID, this.version() + 1);
        this.__unconfirmed_changes__++;
    }

    /**
     * root()
     * 
     * root() gets the aggregate root.
     */

    protected root(): Entity {
        return this.__state__.get(Aggregate.ROOT_ID);
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

        this.__state__.set(Aggregate.ROOT_ID, root);
    }
}