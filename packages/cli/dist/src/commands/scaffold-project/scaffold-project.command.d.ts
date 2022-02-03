import { Command } from "clipanion";
/**
 * ScaffoldProjectCommand
 *
 * Scaffolds a new Domeniere project
 */
export declare class ScaffoldProjectCommand extends Command {
    static paths: string[][];
    static usage: {
        description: string;
        details: string;
    };
    /**
     * The dependencies for a Domeniere application.
     */
    private static PROJECT_DEPENDENCIES;
    domainName: string | undefined;
    /**
     * execute()
     *
     * executes the operation.
     * @returns 0 if successful. non-zero if an error occured.
     */
    execute(): Promise<number>;
}
//# sourceMappingURL=scaffold-project.command.d.ts.map