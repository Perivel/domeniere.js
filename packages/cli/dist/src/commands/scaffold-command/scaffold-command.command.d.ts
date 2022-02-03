import { Command } from "clipanion";
/**
 * ScaffoldCommandCommand
 *
 * Scaffolds a Command in the project.
 */
export declare class ScaffoldCommandCommand extends Command {
    static paths: string[][];
    commandPath: string;
    static usage: {
        category: string;
        description: string;
        details: string;
    };
    /**
     * execute()
     *
     * Executes the command.
     */
    execute(): Promise<number>;
}
//# sourceMappingURL=scaffold-command.command.d.ts.map