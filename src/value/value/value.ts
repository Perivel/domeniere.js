import { ValueInterface } from './value.interface';
import { Equatable, Serializable } from '@perivel/foundation';

/**
 * Value
 * 
 * Value represents a generic Domain Value.
 */

export abstract class Value implements ValueInterface, Equatable, Serializable {

    constructor() {}

    /**
     * equals()
     * 
     * equals() determines if the value is equal to a suspect value. If value equals the suspect, 
     * equals() returns TRUE. Otherwise, it returns FALSE.
     * 
     * @param suspect The value being compared.
     */

    public abstract equals(suspect: any): boolean;

    public abstract serialize(): string;
}