import { Equatable } from "@swindle/core";
import { Identifier } from "./../../value/value.module";

/**
 * EntityInterface
 * 
 * EntityInterface defines the requirements for an entity.
 */

export interface EntityInterface extends Equatable {

    /**
     * identity()
     * 
     * identity() gets the entity Identity.
     */

    id(): Identifier;
}