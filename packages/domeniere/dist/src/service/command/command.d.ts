import { DomainService } from "../service/domain.service";
import { CommandInterface } from "./command.interface";
/**
 * Command
 *
 * A Command is used to update data. Commands should be tasked-based, instead of data centric.
 *
 */
export declare abstract class Command extends DomainService implements CommandInterface {
    constructor();
    /**
     * execute()
     *
     * execute() executes the command operation. Commands do not retrieve any data.
     *
     */
    abstract execute(...args: any): Promise<void>;
}
//# sourceMappingURL=command.d.ts.map