import {
    File,
    FileOpenFlag,
    FileOpenMode,
    FileSystem,
    Path,
} from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
import {
    ArtifactDetails,
    ArtifactDetailsParser,
} from "./../../artifact-details-parser/artifact-details-parrser.well";
import { DomeniereStringFormatter } from "./../../formatters/formatters.well";
import { ModuleValidator } from "./../../validators/validators.well";
import { ModuleValidatorInterface } from "../../validators/module-validator/module.validator.interface";

/**
 * RepositoryArtifact
 * 
 * An artifact for constructing a repository.
 */

export class RepositoryArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "FACTORY_INTERFACE.template.txt");
    private static REPOSITORY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "REPOSITORY.template.txt");
    private static IDENTITY_REPOSITORY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "IDENTITY_REPOSITORY.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;

    // determines if the repository should be an identity generating repository.
    private readonly isIdentityGenerating: boolean;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the repositories directory for the module.
    private readonly moduleRepositoriesDirPath: Path;

    // the repositories well file path for the module.
    private readonly moduleRepositoriesWellFilePath: Path;

    // the directory of the factory to create.
    private readonly repositoryPath: Path;
    private readonly repositoryClassPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
        isIdentityGenerating: boolean = false
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.isIdentityGenerating = isIdentityGenerating;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleRepositoriesDirPath = Path.FromSegments(this.modulePath, "repositories");
        this.moduleRepositoriesWellFilePath = Path.FromSegments(this.moduleRepositoriesDirPath, "repositories.well.ts");
        this.repositoryPath = Path.FromSegments(this.moduleRepositoriesDirPath, this.details.artifactDirPath());
        this.repositoryClassPath = Path.FromSegments(this.repositoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.repository.ts`)

    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.repositoryPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleRepositoriesWellFilePath)) {
            const repositoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleRepositoriesWellFilePath, repositoriesWellFileContent);
        }

        // interfaces and classes.
        let classContent = "";

        if (this.isIdentityGenerating) {
            classContent = await this.loadIdentityRepositoryContents();
        }
        else {
            classContent = await this.loadRepositoryContents();
        }
        filesMap.set(this.repositoryClassPath, classContent);

        return filesMap;
    }

    /**
     * exportsInfo()
     * 
     * gets information about exports to add.
     */

    public async exportsInfo(): Promise<Map<Path, string>> {
        const exports = new Map<Path, string>();

        // export well file to module file.
        exports.set(this.moduleFilePath, `\nexport * from "./repositories/repositories.well";`);

        // export factories files to entities well file.
        const content = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.repository";`;
        exports.set(this.moduleRepositoriesWellFilePath, content);

        return exports;
    }

    /**
     * validate()
     * 
     * Perform any necessary validation. If the vallidation passes, null should be returned.
     * If the validation fails, a string consisting of the error message should be returned.
     *
     * If the validation fails (null is not returned), the artifact will not be built and an error will
     * be thrown.
     */

    public async validate(): Promise<string | null> {

        try {
            // make sure we are in a Domeniere project
            if (!await FileSystem.Contains(this.domconfigPath)) {
                throw new Error("Not a Domeniere Project");
            }

            // make sure the module exists.
            if (!await this.moduleValidator.pathIsModule(this.modulePath, this.stringFormatter.fileNameCase(this.details.module()))) {
                throw new Error(`Module '${this.stringFormatter.classNameCase(this.details.module())}' does not exist.`);
            }

            // make sure the factory does not already exist.
            if (await FileSystem.Contains(this.repositoryClassPath)) {
                throw new Error(`Repository '${this.stringFormatter.classNameCase(this.details.artifactName())}Repository' already exists.`);
            }

            return null;
        }
        catch (e) {
            return (e as Error).message;
        }
    }

    // ================================
    // helpers
    // ================================

    /**
     * loadIdentityRepositoryContents()
     * 
     * loads the identity repository contents.
     * @returns the idemtoty repository class contents.
     */

    public async loadIdentityRepositoryContents(): Promise<string> {
        const file = await FileSystem.Open(RepositoryArtifact.IDENTITY_REPOSITORY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__REPOSITORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadRepositoryContents()
     * 
     * loads the repository contents.
     * @returns the repository class contents.
     */

    public async loadRepositoryContents(): Promise<string> {
        const file = await FileSystem.Open(RepositoryArtifact.REPOSITORY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__REPOSITORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for a repositories well file..
     * @returns the contents for the values well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(RepositoryArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "repositories");
    }
}