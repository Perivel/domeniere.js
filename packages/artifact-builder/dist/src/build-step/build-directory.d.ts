import { Path } from "@swindle/filesystem";
import { BuildStep } from "./build-step";
/**
 * BuildDirectory
 *
 * Builds a directory.
 */
export declare class BuuildDirectory extends BuildStep {
    private readonly directory;
    constructor(directory: Path);
    /**
     * execute()
     *
     * executes the step.
     */
    execute(): Promise<void>;
    /**
     * undo()
     *
     * undoes the step.
     */
    undo(): Promise<void>;
}
//# sourceMappingURL=build-directory.d.ts.map