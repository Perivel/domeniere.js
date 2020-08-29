import { ServiceInterface } from "../service/service.interface";
export interface QueryInterface extends ServiceInterface {
    execute(...args: any): Promise<any>;
}
//# sourceMappingURL=query.interface.d.ts.map