import { Identifier } from "./../../value/value.module";
import { IdentityGeneratingRepositoryInterface } from "./identity-generating-repository.interface";
import { Repository } from "../repository/repository";
export declare abstract class IdentityGeneratingRepository extends Repository implements IdentityGeneratingRepositoryInterface {
    constructor();
    /**
     * generateIdentity()
     *
     * generateIdentity() generates a unique identity.
     */
    abstract generateIdentity(): Identifier;
}
//# sourceMappingURL=identity-generating-repository.d.ts.map