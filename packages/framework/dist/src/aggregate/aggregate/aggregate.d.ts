import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "./../../entity/entity.module";
import { Serializable } from "@swindle/core";
import { Identifier } from "./../../value/value.module";
import { State } from "@domeniere/state";
/**
 * Aggregate
 *
 * Aggregate is a cluster of objects and entities, centered
 * around a root entity, that is required to fulfill some
 * boundary of consistency.
 */
export declare abstract class Aggregate implements AggregateInterface, Serializable {
    private static ROOT_ID;
    private static VERSION_ID;
    readonly __state__: State;
    private __unconfirmed_changes__;
    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */
    constructor(root: Entity, version?: number);
    /**
     * confirmStateChanges()
     *
     * indicates that state changes have been confirmed.
     */
    confirmStateChanges(): void;
    /**
     * unconfirmedStateChangeCount()
     *
     * gets the number of state changes that have not yet been confirmed.
     * @returns the number of unconfirmed state changes that the aggregate has.
     */
    unconfirmedStateChangeCount(): number;
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to deterine if they are equal.
     * @param suspect The suspect to be compared.
     */
    equals(suspect: any): boolean;
    /**
     * id()
     *
     * identity() gets the Identifier of the root.
     */
    id(): Identifier;
    /**
     * hasUnconfirmedStateChanges()
     *
     * determines if the aggregate has unconfirmed state changes
     */
    hasUnconfirmedStateChanges(): boolean;
    /**
     * rollbackStatechanges()
     *
     * rolls back the committed state changes.
     */
    rollbackStateChanges(): void;
    serialize(): string;
    /**
     * serializeData()
     *
     * serializes the data
     */
    protected abstract serializeData(): string;
    toString(): string;
    /**
     * version()
     *
     * gets the version of the aggregate.
     * @returns the version of the aggregate
     */
    version(): number;
    /**
     * commitStateChanges()
     *
     * indicates that state changes have been made to the aggregate.
     */
    protected commitStateChanges(): void;
    /**
     * root()
     *
     * root() gets the aggregate root.
     */
    protected root(): Entity;
    /**
     * setRoot()
     *
     * setRoot() sets the aggregate root.
     * @param root Entity
     * @throws InvalidArgumentException when the root is undefined.
     */
    protected setRoot(root: Entity): void;
}
//# sourceMappingURL=aggregate.d.ts.map