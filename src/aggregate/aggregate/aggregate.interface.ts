import { Identifier } from "../../common/common.module";
import { Equatable } from "@perivel/foundation";


export interface AggregateInterface extends Equatable {

    /**
     * clean()
     * 
     * indicates that the aggregate data has been successfully updated.
     */
    _clean(): void;

    /**
     * identifier()
     * 
     * identity() gets the Id of the root.
     */

    identity(): Identifier;

    /**
     * isDirty()
     * 
     * determines if the aggregate data is dirty.
     */

    _isDirty(): boolean;
}