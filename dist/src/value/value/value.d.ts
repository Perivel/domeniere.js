import { ValueInterface } from './value.interface';
import { Equatable } from 'foundation';
export declare abstract class Value implements ValueInterface, Equatable {
    constructor();
    abstract equals(suspect: any): boolean;
}
//# sourceMappingURL=value.d.ts.map