import { Path } from "@swindle/filesystem";
import { BuildStep } from "./build-step";
/**
 * AddExports
 *
 * Modifies the module file to include the exports.
 */
export declare class AddExports extends BuildStep {
    private readonly modulePath;
    private readonly contents;
    constructor(modulePath: Path, content: string);
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
//# sourceMappingURL=add-export.d.ts.map