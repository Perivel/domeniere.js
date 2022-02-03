import { ServiceInterface } from "../service/service.interface";

/**
 * QueryInterface
 *
 * QueryInterface represents a Query. A query retrieves data from a Data source.
 * A query should not modify any kind of data.
 */

export interface QueryInterface extends ServiceInterface {

    /**
     * execute()
     *
     * execute() executes the query.
     * @param data The data to be passed to the query.
     */

    execute(...args: any): Promise<any>;
}