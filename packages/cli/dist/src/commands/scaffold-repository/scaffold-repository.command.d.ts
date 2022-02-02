import { Command } from "clipanion";
/**
 * ScaffoldRepositoryCommand
 *
 * Scaffolds an repository in the project.
 */
export declare class ScaffoldRepositoryCommand extends Command {
    static paths: string[][];
    repositoryPath: string;
    isIdentityGenerating: boolean | undefined;
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
//# sourceMappingURL=scaffold-repository.command.d.ts.map