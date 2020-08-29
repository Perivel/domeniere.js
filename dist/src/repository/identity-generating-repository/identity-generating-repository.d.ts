import { Identifier } from "../../common/common.module";
import { IdentityGeneratingRepositoryInterface } from "./identity-generating-repository.interface";
import { Repository } from "../repository/repository";
export declare abstract class IdentityGeneratingRepository extends Repository implements IdentityGeneratingRepositoryInterface {
    constructor();
    abstract generateIdentity(): Identifier;
}
//# sourceMappingURL=identity-generating-repository.d.ts.map