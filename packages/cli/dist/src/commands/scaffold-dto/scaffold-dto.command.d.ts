import { Command } from "clipanion";
/**
 * ScaffoldDtoCommand
 *
 * Scaffolds a Dto in the project.
 */
export declare class ScaffoldDtoCommand extends Command {
    static paths: string[][];
    dtoPath: string;
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
//# sourceMappingURL=scaffold-dto.command.d.ts.map