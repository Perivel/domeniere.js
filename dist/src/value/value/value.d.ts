import { ValueInterface } from './value.interface';
import { Equatable, Serializable } from 'swindle';
/**
 * Value
 *
 * Value represents a generic Domain Value.
 */
export declare abstract class Value implements ValueInterface, Equatable, Serializable {
    constructor();
    /**
     * equals()
     *
     * equals() determines if the value is equal to a suspect value. If value equals the suspect,
     * equals() returns TRUE. Otherwise, it returns FALSE.
     *
     * @param suspect The value being compared.
     */
    abstract equals(suspect: any): boolean;
    abstract serialize(): string;
    toString(): string;
}
//# sourceMappingURL=value.d.ts.map