import { Command } from "clipanion";
/**
 * ScaffoldAggregateCommand
 *
 * Scaffolds an aggregate in the project.
 */
export declare class ScaffoldAggregateCommand extends Command {
    static paths: string[][];
    aggregatePath: string;
    timestamped: boolean | undefined;
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
//# sourceMappingURL=scaffold-aggregate.command.d.ts.map