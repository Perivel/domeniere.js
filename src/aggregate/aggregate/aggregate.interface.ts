import { Identifier } from "../../common/common.module";
import { Equatable } from "swindle";


export interface AggregateInterface extends Equatable {

    /**
     * identifier()
     * 
     * identity() gets the Id of the root.
     */

    identity(): Identifier;
}