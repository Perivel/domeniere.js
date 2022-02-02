import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * RepositoryArtifact
 *
 * An artifact for constructing a repository.
 */
export declare class RepositoryArtifact extends Artifact {
    private static WELL_PATH;
    private static INTERFACE_PATH;
    private static REPOSITORY_PATH;
    private static IDENTITY_REPOSITORY_PATH;
    private readonly projectRoot;
    private readonly details;
    private readonly isIdentityGenerating;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly moduleFilePath;
    private readonly moduleRepositoriesDirPath;
    private readonly moduleRepositoriesWellFilePath;
    private readonly repositoryPath;
    private readonly repositoryClassPath;
    private readonly stringFormatter;
    private readonly inputParser;
    private readonly moduleValidator;
    constructor(details: string, projectRoot: Path, isIdentityGenerating?: boolean);
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo(): Path[];
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    filesInfo(): Promise<Map<Path, string>>;
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    exportsInfo(): Promise<Map<Path, string>>;
    /**
     * validate()
     *
     * Perform any necessary validation. If the vallidation passes, null should be returned.
     * If the validation fails, a string consisting of the error message should be returned.
     *
     * If the validation fails (null is not returned), the artifact will not be built and an error will
     * be thrown.
     */
    validate(): Promise<string | null>;
    /**
     * loadIdentityRepositoryContents()
     *
     * loads the identity repository contents.
     * @returns the idemtoty repository class contents.
     */
    loadIdentityRepositoryContents(): Promise<string>;
    /**
     * loadRepositoryContents()
     *
     * loads the repository contents.
     * @returns the repository class contents.
     */
    loadRepositoryContents(): Promise<string>;
    /**
     * loadWellContents()
     *
     * loads the contents for a repositories well file..
     * @returns the contents for the values well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=repository.artifact.d.ts.map