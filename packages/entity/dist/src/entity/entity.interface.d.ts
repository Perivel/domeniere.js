import { Equatable } from "@swindle/core";
import { Identifier } from "@domeniere/value";
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