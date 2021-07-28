import { Serializable } from "swindle";
import { DataInterface } from "./data.interface";
/**
 * Data
 *
 * Data is the base class for a Data Transfer Object.
 */
export declare abstract class Data implements DataInterface, Serializable {
    constructor();
    abstract serialize(): string;
    toString(): string;
}
//# sourceMappingURL=data.d.ts.map