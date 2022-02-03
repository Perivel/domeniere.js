import { Command } from "clipanion";
/**
 * ScaffoldModuleCommand
 *
 * Scaffolds a module in the project.
 */
export declare class ScaffoldModuleCommand extends Command {
    static paths: string[][];
    moduleName: string;
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
//# sourceMappingURL=scaffold-module.command.d.ts.map