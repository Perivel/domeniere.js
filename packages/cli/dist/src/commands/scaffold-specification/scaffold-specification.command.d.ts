import { Command } from "clipanion";
/**
 * ScaffoldSpecificationCommand
 *
 * Scaffolds a Specification in the project.
 */
export declare class ScaffoldSpecificationCommand extends Command {
    static paths: string[][];
    specificationPath: string;
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
//# sourceMappingURL=scaffold-specification.command.d.ts.map