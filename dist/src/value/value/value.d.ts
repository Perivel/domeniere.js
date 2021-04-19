import { ValueInterface } from './value.interface';
import { Equatable } from 'foundation';
/**
 * Value
 *
 * Value represents a generic Domain Value.
 */
export declare abstract class Value implements ValueInterface, Equatable {
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
}
//# sourceMappingURL=value.d.ts.map