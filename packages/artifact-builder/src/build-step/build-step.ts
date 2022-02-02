import { BuildStepInterface } from "./build-step.interface";

/**
 * BuildStep
 * 
 * Represent a single step in the build process of an artifact.
 */

export abstract class BuildStep implements BuildStepInterface {

    constructor() {
        //
    }

    /**
     * execute()
     * 
     * executes the step.
     */

    public abstract execute(): Promise<void>;

    /**
     * undo()
     * 
     * undoes the step.
     */

    public abstract undo(): Promise<void>;
}