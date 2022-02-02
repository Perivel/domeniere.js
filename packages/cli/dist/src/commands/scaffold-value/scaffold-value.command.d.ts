import { Command } from "clipanion";
/**
 * ScaffoldEntityCommand
 *
 * Scaffolds a entity in the project.
 */
export declare class ScaffoldValueCommand extends Command {
    static paths: string[][];
    valuePath: string;
    identifier: boolean | undefined;
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
//# sourceMappingURL=scaffold-value.command.d.ts.map