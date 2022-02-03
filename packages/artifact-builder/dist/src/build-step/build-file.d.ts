import { Path } from "@swindle/filesystem";
import { BuildStep } from "./build-step";
/**
 * BuildFile
 *
 * Builds a file.
 */
export declare class BuuildFile extends BuildStep {
    private readonly filePath;
    private readonly contents;
    constructor(path: Path, content: string);
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
//# sourceMappingURL=build-file.d.ts.map