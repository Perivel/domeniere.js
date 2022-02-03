export interface BuildStepInterface {
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
//# sourceMappingURL=build-step.interface.d.ts.map