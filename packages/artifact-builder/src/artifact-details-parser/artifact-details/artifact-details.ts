import { ArtifactDetailsInterface } from "./artifact-details.interface";

/**
 * ArtifactDetails
 * 
 * The artifact details.
 */

export class ArtifactDetails implements ArtifactDetailsInterface {

    private readonly mod: string;
    private readonly path: string;
    private readonly name: string;
    private readonly nest: number;

    constructor(module: string, artifactPath: string, artifactName: string, nest: number) {
        this.mod = module;
        this.path = artifactPath;
        this.name = artifactName;
        this.nest = +nest;
    }

    /**
     * artifactPath()
     * 
     * gets the artifact path.
     */

    public artifactDirPath(): string {
        return this.path;
    }

    /**
     * artifactName()
     * 
     * gets the artifact name.
     */

    public artifactName(): string {
        return this.name;
    }

    /**
     * module()
     * 
     * gets the module.
     */

    public module(): string {
        return this.mod;
    }

    /**
     * nestLevel()
     * 
     * The nest level is the number of subdirectories from the root directory of the artifact type the artifact is embedded.
     * For example, the nest level of "module/value" = 1. Meanwhile, the nest level of "module/path/to/value" = 3.
     */

    public nestLevel(): number {
        return this.nest;
    }
}