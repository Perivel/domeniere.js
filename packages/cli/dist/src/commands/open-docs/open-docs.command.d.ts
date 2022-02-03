import { Command } from "clipanion";
/**
 * OpenDocsCommand
 *
 * Opens the Documentations page.
 */
export declare class OpenDocsCommand extends Command {
    static paths: string[][];
    sectionName: string | undefined;
    static usage: {
        category: string;
        description: string;
        details: string;
    };
    private readonly pages;
    /**
     * execute()
     *
     * Executes the command.
     */
    execute(): Promise<number>;
}
//# sourceMappingURL=open-docs.command.d.ts.map