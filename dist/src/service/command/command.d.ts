import { DomainService } from "../service/domain.service";
import { CommandInterface } from "./command.interface";
export declare abstract class Command extends DomainService implements CommandInterface {
    constructor();
    abstract execute(...args: any): Promise<void>;
}
//# sourceMappingURL=command.d.ts.map