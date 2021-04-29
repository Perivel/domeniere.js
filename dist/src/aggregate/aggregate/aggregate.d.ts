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
    private _dirty;
    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */
    constructor(root: Entity);
    /**
     * clean()
     *
     * indicates that the aggregate data has been successfully updated.
     */
    _clean(): void;
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
     * isDirty()
     *
     * determines if the aggregate data is dirty.
     */
    _isDirty(): boolean;
    serialize(): string;
    /**
     * serializeData()
     *
     * serializes the data
     */
    protected abstract serializeData(): string;
    toString(): string;
    /**
     * markDirty()
     *
     * indicates that the aggregate data is dirty and needs updating.
     */
    protected markDirty(): void;
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