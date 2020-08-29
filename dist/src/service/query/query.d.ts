import { DomainService } from "../service/domain.service";
import { QueryInterface } from "./query.interface";
export declare abstract class Query extends DomainService implements QueryInterface {
    constructor();
    abstract execute(...data: any): Promise<any>;
}
//# sourceMappingURL=query.d.ts.map