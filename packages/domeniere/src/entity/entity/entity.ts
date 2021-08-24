import { EntityInterface } from "./entity.interface";
import { InvalidArgumentException, Serializable } from "@swindle/core";
import { Identifier } from "../../common/interfaces/identifier.interface";

/**
 * Entity
 * 
 * An entity is a domain object with an established identity.
 */

export abstract class Entity implements EntityInterface, Serializable {
    private _id: Identifier;

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

        this._id = id;
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
        return this._id;
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
        this._id = id;
    }
}