import { Command } from "clipanion";
/**
 * ScaffoldEventCommand
 *
 * Scaffolds an event in the project.
 */
export declare class ScaffoldEventCommand extends Command {
    static paths: string[][];
    eventPath: string;
    errorEvent: boolean | undefined;
    noBroadcst: boolean | undefined;
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
//# sourceMappingURL=scaffold-event.command.d.ts.map