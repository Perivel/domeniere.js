import { Id, Equatable } from "foundation";

/**
 * EntityInterface
 * 
 * EntityInterface defines the requirements for an entity.
 */

export interface EntityInterface extends Equatable {

    /**
     * id()
     * 
     * id() gets the entity Id.
     */

    id(): Id;
}