import { DomainService } from "../service/domain.service";
import { QueryInterface } from "./query.interface";
/**
 * Query
 *
 * Query represents a Query. A query retrieves data from a Data source.
 * A query should not modify any kind of data.
 */
export declare abstract class Query extends DomainService implements QueryInterface {
    constructor();
    /**
     * execute()
     *
     * execute() executes the query.
     * @param data The data to be passed to the query.
     */
    abstract execute(...data: any): Promise<any>;
}
//# sourceMappingURL=query.d.ts.map