import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "../../entity/entity.module";
import { Identifier } from "../../common/common.module";
/**
 * Aggregate
 *
 * Aggregate is a cluster of objects and entities, centered
 * around a root entity, that is required to fulfill some
 * boundary of consistency.
 */
export declare abstract class Aggregate implements AggregateInterface {
    private _root;
    /**
     * Creates an instance of an aggregate.
     * @param root The aggregate root.
     * @throws InvalidArgumentException when the root is undefined.
     */
    constructor(root: Entity);
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