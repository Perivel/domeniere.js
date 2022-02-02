import { ServiceInterface } from "../service/service.interface";
/**
 * CommandInterface
 *
 * CommandInterface contains the requirements for a CQRS Command.
 */
export interface CommandInterface extends ServiceInterface {
    /**
     * execute()
     *
     * execute() executes the command operation. Commands do not retrieve any data.
     *
     */
    execute(...args: any): Promise<void>;
}
//# sourceMappingURL=command.interface.d.ts.map