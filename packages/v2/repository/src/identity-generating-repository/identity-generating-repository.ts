import { Identifier } from "@domeniere/value";
import { IdentityGeneratingRepositoryInterface } from "./identity-generating-repository.interface";
import { Repository } from "../repository/repository";

export abstract class IdentityGeneratingRepository extends Repository implements IdentityGeneratingRepositoryInterface {

    constructor() {
        super();
    }

    /**
     * generateIdentity()
     * 
     * generateIdentity() generates a unique identity.
     */

    public abstract generateIdentity(): Identifier;
}