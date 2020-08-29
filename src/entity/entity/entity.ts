import { EntityInterface } from "./entity.interface";
import { Id, InvalidArgumentException } from "foundation";

/**
 * Entity
 * 
 * An entity is a domain object with an established identity.
 */

export abstract class Entity implements EntityInterface {
    private _id: Id;

    /**
     * creates a new entity instance.
     * @param id 
     * @throws InvalidArgumentException when the id is undefined.
     */

    constructor(id: Id) {

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

    public id(): Id {
        return this._id;
    }

    /**
     * setId()
     * 
     * setId() sets the entity id.
     * @param id The id to set.
     */

    protected setId(id: Id): void {
        this._id = id;
    }
}