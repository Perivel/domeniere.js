import { DomainService } from "../service/domain.service";
import { CommandInterface } from "./command.interface";

/**
 * Command
 * 
 * A Command is used to update data. Commands should be tasked-based, instead of data centric.
 * Commands.
 */

export abstract class Command extends DomainService implements CommandInterface {

    constructor() {
        super();
    }

    /**
     * execute()
     * 
     * execute() executes the command operation. Commands do not retrieve any data.
     *
     */

    public async abstract execute(...args: any): Promise<void>;
}