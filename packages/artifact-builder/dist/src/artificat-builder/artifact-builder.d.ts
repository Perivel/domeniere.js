import { Artifact } from "../artifact/artifact";
import { ArtifactBuilderInterface } from "./artifact-builder.interface";
/**
 * ArtifactBuilder
 *
 * A Utility class to build artifacts.
 */
export declare class ArtifactBuilder implements ArtifactBuilderInterface {
    private readonly buildSteps;
    private readonly completedSteps;
    constructor();
    /**
     * build()
     *
     * builds the artifact.
     */
    build(artifact: Artifact): Promise<void>;
    /**
     * executBuildSteps()
     *
     * executes the build steps.
     * @param steps the steps to execute.
     *
     */
    private executeBuildSteps;
    /**
     * prepareSteps()
     *
     * Prepare the build steps.
     */
    private prepareSteps;
    /**
     * undoBuildSteps()
     *
     * undoes the build steps that have already been executed.
     * @param steps the steps to execute.
     */
    private undoBuildSteps;
}
//# sourceMappingURL=artifact-builder.d.ts.map