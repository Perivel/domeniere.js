import { Equatable } from "@perivel/foundation";

/**
 * Identifier Interface
 * 
 * Identifier interface indicates that an object can be used as an identifier for another object.
 */

export interface Identifier extends Equatable {

    /**
     * gets the id value.
     */
    
    id(): any;
}