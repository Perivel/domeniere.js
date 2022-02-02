import { Aggregate } from "@domeniere/aggregate";

/**
 * RepositoryInterface
 * 
 * RepositoryInterface specifies the requirements for a repository.
 */

export interface RepositoryInterface {

    /**
     * remove()
     * 
     * removes an item from the repository.
     * @param aggregate 
     */

    remove(aggregate: Aggregate): Promise<void>;

    /**
     * save()
     * 
     * save() persists an aggregate to the repository.
     * @param aggregate 
     */

    save(aggregate: Aggregate): Promise<void>;

    /**
     * size()
     * 
     * size() gets the number of items in the repository.
     */

    size(): Promise<number>;
}