import { AggregateInterface } from "../../aggregate/aggregate.module";
export interface RepositoryInterface {
    remove(aggregate: AggregateInterface): Promise<void>;
    save(aggregate: AggregateInterface): Promise<void>;
    size(): Promise<number>;
}
//# sourceMappingURL=repository.interface.d.ts.map