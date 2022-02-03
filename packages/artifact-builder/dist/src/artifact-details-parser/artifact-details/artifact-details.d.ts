import { ArtifactDetailsInterface } from "./artifact-details.interface";
/**
 * ArtifactDetails
 *
 * The artifact details.
 */
export declare class ArtifactDetails implements ArtifactDetailsInterface {
    private readonly mod;
    private readonly path;
    private readonly name;
    private readonly nest;
    constructor(module: string, artifactPath: string, artifactName: string, nest: number);
    /**
     * artifactPath()
     *
     * gets the artifact path.
     */
    artifactDirPath(): string;
    /**
     * artifactName()
     *
     * gets the artifact name.
     */
    artifactName(): string;
    /**
     * module()
     *
     * gets the module.
     */
    module(): string;
    /**
     * nestLevel()
     *
     * The nest level is the number of subdirectories from the root directory of the artifact type the artifact is embedded.
     * For example, the nest level of "module/value" = 1. Meanwhile, the nest level of "module/path/to/value" = 3.
     */
    nestLevel(): number;
}
//# sourceMappingURL=artifact-details.d.ts.map