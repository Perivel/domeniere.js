import { Command } from "clipanion";
/**
 * ScaffoldFactoryCommand
 *
 * Scaffolds an factory in the project.
 */
export declare class ScaffoldFactoryCommand extends Command {
    static paths: string[][];
    factoryPath: string;
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
//# sourceMappingURL=scaffold-factory.command.d.ts.map