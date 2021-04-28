import { Serializable } from "@perivel/foundation";
import { DataInterface } from "./data.interface";

/**
 * Data
 * 
 * Data is the base class for a Data Transfer Object.
 */

export abstract class Data implements DataInterface, Serializable {

    constructor() {}

    public abstract serialize(): string;

    public toString(): string {
        return this.serialize();
    }
}