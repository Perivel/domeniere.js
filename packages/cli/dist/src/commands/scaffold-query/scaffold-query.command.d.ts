import { Command } from "clipanion";
/**
 * ScaffoldQueryCommand
 *
 * Scaffolds a Query in the project.
 */
export declare class ScaffoldQueryCommand extends Command {
    static paths: string[][];
    queryPath: string;
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
//# sourceMappingURL=scaffold-query.command.d.ts.map