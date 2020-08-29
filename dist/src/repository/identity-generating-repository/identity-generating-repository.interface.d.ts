import { RepositoryInterface } from "../repository/repository.interface";
import { Identifier } from "../../common/common.module";
export interface IdentityGeneratingRepositoryInterface extends RepositoryInterface {
    generateIdentity(): Identifier;
}
//# sourceMappingURL=identity-generating-repository.interface.d.ts.map