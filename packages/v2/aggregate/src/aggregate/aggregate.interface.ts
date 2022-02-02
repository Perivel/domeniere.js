import { Identifier } from "@domeniere/value";
import { Equatable } from "@swindle/core";


export interface AggregateInterface extends Equatable {

    /**
     * id()
     * 
     * id() gets the Id of the root.
     */

    id(): Identifier;
}