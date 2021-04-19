import { EntityInterface } from "./entity.interface";
import { Identifier } from "../../common/interfaces/identifier.interface";
/**
 * Entity
 *
 * An entity is a domain object with an established identity.
 */
export declare abstract class Entity implements EntityInterface {
    private _id;
    /**
     * creates a new entity instance.
     * @param id The entity identifier.
     * @throws InvalidArgumentException when the id is undefined.
     */
    constructor(id: Identifier);
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