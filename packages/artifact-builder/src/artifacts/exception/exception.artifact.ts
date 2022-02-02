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
 * exceptionArtifact
 * 
 * An artifact for constructing an Exception.
 */

export class ExceptionArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static EXCEPTION_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "EXCEPTION.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the exceptions directory for the module.
    private readonly moduleExceptionsDirPath: Path;

    // the exceptions well file path for the module.
    private readonly moduleExceptionWellFilePath: Path;

    // the directory of the factory to create.
    private readonly exceptionPath: Path;
    private readonly exceptionClassPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleExceptionsDirPath = Path.FromSegments(this.modulePath, "exceptions");
        this.moduleExceptionWellFilePath = Path.FromSegments(this.moduleExceptionsDirPath, "exceptions.well.ts");
        this.exceptionPath = Path.FromSegments(this.moduleExceptionsDirPath, this.details.artifactDirPath());
        this.exceptionClassPath = Path.FromSegments(this.exceptionPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.exception.ts`);
    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.exceptionPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleExceptionWellFilePath)) {
            const factoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleExceptionWellFilePath, factoriesWellFileContent);
        }

        // interfaces and classes.
        const classContent = await this.loadExceptionContents();
        filesMap.set(this.exceptionClassPath, classContent);

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
        exports.set(this.moduleFilePath, `\nexport * from "./exceptions/exceptions.well";`);

        // export factories files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.exception";`;
        exports.set(this.moduleExceptionWellFilePath, classContent);

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
            if (await FileSystem.Contains(this.exceptionClassPath)) {
                throw new Error(`Exception '${this.stringFormatter.classNameCase(this.details.artifactName())}Exception' already exists.`);
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
     * loadExceptionContents()
     * 
     * loads the exception contents.
     * @returns the exception class contents.
     */

    public async loadExceptionContents(): Promise<string> {
        const file = await FileSystem.Open(ExceptionArtifact.EXCEPTION_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__EXCEPTION_TEXT__/g, this.stringFormatter.capitalCase(this.details.artifactName()))
            .replace(/__EXCEPTION_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(ExceptionArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "exceptions");
    }
}