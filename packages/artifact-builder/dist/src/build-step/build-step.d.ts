import { BuildStepInterface } from "./build-step.interface";
/**
 * BuildStep
 *
 * Represent a single step in the build process of an artifact.
 */
export declare abstract class BuildStep implements BuildStepInterface {
    constructor();
    /**
     * execute()
     *
     * executes the step.
     */
    abstract execute(): Promise<void>;
    /**
     * undo()
     *
     * undoes the step.
     */
    abstract undo(): Promise<void>;
}
//# sourceMappingURL=build-step.d.ts.map