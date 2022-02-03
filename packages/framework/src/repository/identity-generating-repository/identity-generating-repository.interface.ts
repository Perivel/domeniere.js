import { RepositoryInterface } from "../repository/repository.interface";
import { Identifier } from "./../../value/value.module";

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