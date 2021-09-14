import { Serializable } from "@swindle/core";
import { State } from "@domeniere/state";
import { Identifier } from "@domeniere/value";
import { EntityInterface } from "./entity.interface";
/**
 * Entity
 *
 * An entity is a domain object with an established identity.
 */
export declare abstract class Entity implements EntityInterface, Serializable {
    private static ID_STATE_KEY;
    readonly __state__: State;
    /**
     * creates a new entity instance.
     * @param id The entity identifier.
     * @throws InvalidArgumentException when the id is undefined.
     */
    constructor(id: Identifier);
    /**
     * commitStateChange()
     *
     * commitStateChange() informs the entity that a state change has occured.
     */
    protected commitStateChanges(): void;
    /**
     * confirmStateChanges()
     *
     * confirms the state changes.
     */
    confirmStateChanges(): void;
    /**
     * equals()
     *
     * Compares the entity to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */
    abstract equals(suspect: any): boolean;
    /**
     * id()
     *
     * id() gets the id value of the entity.
     */
    id(): Identifier;
    /**
     * rollbackStateChanges()
     *
     * rolls back the committed state changes.
     */
    rollbackStateChanges(): void;
    serialize(): string;
    /**
     * serializeData()
     *
     * serializes the data.
     */
    protected abstract serializeData(): string;
    toString(): string;
    /**
     * setId()
     *
     * setId() sets the entity id.
     * @param id The id to set.
     */
    protected setId(id: Identifier): void;
}
//# sourceMappingURL=entity.d.ts.map