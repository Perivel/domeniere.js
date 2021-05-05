import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "../../entity/entity.module";
import { Serializable } from "@perivel/foundation";
import { Identifier } from "../../common/common.module";
/**
 * Aggregate
 *
 * Aggregate is a cluster of objects and entities, centered
 * around a root entity, that is required to fulfill some
 * boundary of consistency.
 */
export declare abstract class Aggregate implements AggregateInterface, Serializable {
    private _root;
    private __committed_ver__;
    private __confirmed_ver__;
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
     * countUnconfirmedStateChanges()
     *
     * gets the number of state changes that have not yet been confirmed.
     * @returns the number of unconfirmed state changes that the aggregate has.
     */
    countUnconfirmedStateChanges(): number;
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to deterine if they are equal.
     * @param suspect The suspect to be compared.
     */
    equals(suspect: any): boolean;
    /**
     * identity()
     *
     * identity() gets the Identifier of the root.
     */
    identity(): Identifier;
    /**
     * hasUnconfirmedStateChanges()
     *
     * determines if the aggregate has unconfirmed state changes
     */
    hasUnconfirmedStateChanges(): boolean;
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