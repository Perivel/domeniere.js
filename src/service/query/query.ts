import { DomainService } from "../service/domain.service";
import { QueryInterface } from "./query.interface";

/**
 * Query
 * 
 * Query represents a Query. A query retrieves data from a Data source.
 * A query should not modify any kind of data.
 */

export abstract class Query extends DomainService implements QueryInterface {

    constructor() {
        super();
    }

    /**
     * execute() 
     * 
     * execute() executes the query.
     * @param data The data to be passed to the query.
     */

    public abstract execute(...data: any): Promise<any>;
}