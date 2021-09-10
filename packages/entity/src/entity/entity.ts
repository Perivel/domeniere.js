import { 
    InvalidArgumentException, 
    Serializable 
} from "@swindle/core";
import { State } from "@domeniere/state";
import { Identifier } from "@domeniere/value";
import { EntityInterface } from "./entity.interface";

/**
 * Entity
 * 
 * An entity is a domain object with an established identity.
 */

export abstract class Entity implements EntityInterface, Serializable {

    private static ID_STATE_KEY = "__id__";

    protected readonly __state__: State;

    /**
     * creates a new entity instance.
     * @param id The entity identifier.
     * @throws InvalidArgumentException when the id is undefined.
     */

    constructor(id: Identifier) {

        if (!id) {
            // id is undefined.
            throw new InvalidArgumentException("An entity's id cannot be undefined.");
        }

        this.__state__ = new State();
        this.__state__.initialize(Entity.ID_STATE_KEY, id);
    }

    /**
     * commitStateChange()
     * 
     * commitStateChange() informs the entity that a state change has occured.
     */

    protected commitStateChanges(): void {
        //
    }

    /**
     * confirmStateChanges()
     * 
     * confirms the state changes.
     */

    public confirmStateChanges(): void {
        this.__state__.confirmChanges();
    }

    /**
     * equals()
     * 
     * Compares the entity to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */

    public abstract equals(suspect: any): boolean;


    /**
     * id()
     * 
     * id() gets the id value of the entity.
     */

    public id(): Identifier {
        return this.__state__.get(Entity.ID_STATE_KEY);
    }

    /**
     * rollbackStateChanges()
     * 
     * rolls back the committed state changes.
     */

    public rollbackStateChanges(): void {
        this.__state__.discardChanges();
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id().id().toString(),
            data: this.serializeData(),
        });
    }

    /**
     * serializeData()
     * 
     * serializes the data.
     */
    
    protected abstract serializeData(): string;

    public toString(): string {
        return this.id().toString();
    }

    /**
     * setId()
     * 
     * setId() sets the entity id.
     * @param id The id to set.
     */

    protected setId(id: Identifier): void {
        this.__state__.set(Entity.ID_STATE_KEY, id);
    }
}