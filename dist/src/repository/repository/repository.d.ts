import { RepositoryInterface } from "./repository.interface";
import { AggregateInterface } from "../../aggregate/aggregate.module";
/**
 * Repostory
 *
 * Repository represents a generic repository.
 */
export declare abstract class Repository implements RepositoryInterface {
    constructor();
    /**
     * remove()
     *
     * removes an item from the repository.
     * @param aggregate
     */
    abstract remove(aggregate: AggregateInterface): Promise<void>;
    /**
     * save()
     *
     * save() persists an aggregate to the repository.
     * @param aggregate
     */
    abstract save(aggregate: AggregateInterface): Promise<void>;
    /**
     * size()
     *
     * size() gets the number of items in the repository.
     */
    abstract size(): Promise<number>;
}
//# sourceMappingURL=repository.d.ts.map