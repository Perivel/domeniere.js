import { Path } from "@swindle/filesystem";
import { Artifact } from "../../artifact/artifact";
import { PackageManager } from "../../constants/constants.well";
/**
 * ProjectArtifact
 *
 * A Project artifact.
 *
 * An artifact representing a Domeniere Project.
 */
export declare class ProjectArtifact extends Artifact {
    private static INDEX_PATH;
    private static PACKAGE_JSON_PATH;
    private static DOMCONFIG_PATH;
    private static GITIGNORE_PATH;
    private static TSCONFIG_PATH;
    private static EVENTSTORE_PATH;
    private static API_PATH;
    private static README_PATH;
    private readonly domainName;
    private readonly description;
    private readonly author;
    private readonly repository;
    private readonly license;
    private readonly packageManager;
    private readonly targetDir;
    private readonly formatter;
    private readonly projectRootDirectory;
    private readonly projectSrcDirectory;
    constructor(domainName: string, description: string, author: string, repositoryUrl: URL | null, license: string, packageManager: PackageManager, targetDir: Path);
    /**
     * directory()
     *
     * The directory where the artifacts will be contained.
     */
    directoriesInfo(): Path[];
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    filesInfo(): Promise<Map<Path, string>>;
    /**
     * validate()
     *
     * validates the current state. If the current state is valid, null is returned. If
     * the state is invalid, a string containing the error message should be returned.
     *
     */
    validate(): Promise<string | null>;
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    exportsInfo(): Promise<Map<Path, string>>;
    /**
     * loadApiContents()
     *
     * loads the API content.
     * @returns the API content
     */
    private loadApiContents;
    /**
     * loadDomConfigContents()
     *
     * loads the domconfig.json content.
     * @returns loads the domconfig contents.
     */
    private loadDomConfigContents;
    /**
     * loadEcentStoreContents();
     *
     * loads the event store content.
     * @returns the contents of the event store.
     */
    private loadEventStoreContents;
    /**
     * loadGitignoreContents()
     *
     * loads the gitignore contents
     * @returns the contents of the .gitignore file.
     */
    private loadGitignoreContents;
    /**
     * loadIndexContents()
     *
     * loads the index contents.
     * @returns the index file contents
     */
    private loadIndexContents;
    /**
     * loadPackageJsonContents()
     *
     * loads the package.json file contents.
     * @returns the package.json file contents.
     */
    private loadPackageJsonContents;
    /**
     * loadReadmeContents()
     *
     * loads the README contents.
     * @returns the README file contents
     */
    private loadReadmeContents;
    /**
     * loadTsconfigContents()
     *
     * loads the tsconfig.json contents
     * @returns the contents of the tsconfig file.
     */
    private loadTsconfigContents;
}
//# sourceMappingURL=project.artifact.d.ts.map