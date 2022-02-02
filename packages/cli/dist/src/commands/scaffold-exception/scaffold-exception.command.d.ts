import { Command } from "clipanion";
/**
 * ScaffoldExceptionCommand
 *
 * Scaffolds an exception in the project.
 */
export declare class ScaffoldExceptionCommand extends Command {
    static paths: string[][];
    exceptionPath: string;
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
//# sourceMappingURL=scaffold-exception.command.d.ts.map