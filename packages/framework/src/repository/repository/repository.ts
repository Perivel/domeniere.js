import { RepositoryInterface } from "./repository.interface";
import { Aggregate } from "./../../aggregate/aggregate.module";

/**
 * Repostory
 * 
 * Repository represents a generic repository.
 */

export abstract class Repository implements RepositoryInterface {

    constructor() { }

    /**
     * remove()
     * 
     * removes an item from the repository.
     * @param aggregate 
     */

    public abstract remove(aggregate: Aggregate): Promise<void>;

    /**
     * save()
     * 
     * save() persists an aggregate to the repository.
     * @param aggregate 
     */

    public abstract save(aggregate: Aggregate): Promise<void>;

    /**
     * size()
     * 
     * size() gets the number of items in the repository.
     */

    public abstract size(): Promise<number>;
}