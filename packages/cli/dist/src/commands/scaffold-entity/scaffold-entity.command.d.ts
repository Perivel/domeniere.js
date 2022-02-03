import { Command } from "clipanion";
/**
 * ScaffoldEntityCommand
 *
 * Scaffolds an entity in the project.
 */
export declare class ScaffoldEntityCommand extends Command {
    static paths: string[][];
    entityPath: string;
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
//# sourceMappingURL=scaffold-entity.command.d.ts.map