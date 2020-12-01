import { Equatable } from "foundation";
import { Identifier } from "../../common/interfaces/identifier.interface";
/**
 * EntityInterface
 *
 * EntityInterface defines the requirements for an entity.
 */
export interface EntityInterface extends Equatable {
    /**
     * identity()
     *
     * identity() gets the entity Identity.
     */
    id(): Identifier;
}
//# sourceMappingURL=entity.interface.d.ts.map