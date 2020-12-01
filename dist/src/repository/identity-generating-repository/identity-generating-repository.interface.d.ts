import { RepositoryInterface } from "../repository/repository.interface";
import { Identifier } from "../../common/common.module";
/**
 * IdentityGeneratingRepositoryInterface
 *
 * IdentityGeneratingRepositoryInterface specifies the functioinality for a repository
 * that is tasked with assigning identity ot its aggregates.
 */
export interface IdentityGeneratingRepositoryInterface extends RepositoryInterface {
    /**
     * generateIdentity()
     *
     * generateIdentity() generates a unique identity.
     */
    generateIdentity(): Identifier;
}
//# sourceMappingURL=identity-generating-repository.interface.d.ts.map