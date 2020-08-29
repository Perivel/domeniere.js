import { RepositoryInterface } from "./repository.interface";
import { AggregateInterface } from "../../aggregate/aggregate.module";
export declare abstract class Repository implements RepositoryInterface {
    constructor();
    abstract remove(aggregate: AggregateInterface): Promise<void>;
    abstract save(aggregate: AggregateInterface): Promise<void>;
    abstract size(): Promise<number>;
}
//# sourceMappingURL=repository.d.ts.map