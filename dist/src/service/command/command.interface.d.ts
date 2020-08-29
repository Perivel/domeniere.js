import { ServiceInterface } from "../service/service.interface";
export interface CommandInterface extends ServiceInterface {
    execute(...args: any): Promise<void>;
}
//# sourceMappingURL=command.interface.d.ts.map