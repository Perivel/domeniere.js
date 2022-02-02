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
import { DomConfig } from "../../interfaces/domconfig.interface";

/**
 * SpecificationArtifact
 * 
 * An artifact for constructing a Specification.
 */

export class SpecificationArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static SPECIFICATION_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "SPECIFICATION.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the Specifications directory for the module.
    private readonly moduleSpecificationsDirPath: Path;

    // the specifications well file path for the module.
    private readonly moduleSpecificationsWellFilePath: Path;

    // the directory of the Specification to create.
    private readonly specificationPath: Path;
    private readonly specificationClassPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path
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
        this.moduleSpecificationsDirPath = Path.FromSegments(this.modulePath, "specifications");
        this.moduleSpecificationsWellFilePath = Path.FromSegments(this.moduleSpecificationsDirPath, "specifications.well.ts");
        this.specificationPath = Path.FromSegments(this.moduleSpecificationsDirPath, this.details.artifactDirPath());
        this.specificationClassPath = Path.FromSegments(this.specificationPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.specification.ts`);
    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.specificationPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleSpecificationsWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleSpecificationsWellFilePath, eventsWellFileContent);
        }

        // interfaces and classes.
        const classContent = await this.loadSpecificationContents();
        filesMap.set(this.specificationClassPath, classContent);

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
        exports.set(this.moduleFilePath, `\nexport * from "./specifications/specifications.well";`);

        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.specification";`;
        exports.set(this.moduleSpecificationsWellFilePath, classContent);

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

            // make sure the event does not already exist.
            if (await FileSystem.Contains(this.specificationClassPath)) {
                throw new Error(`Specification '${this.stringFormatter.classNameCase(this.details.artifactName())}Specification' already exists.`);
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
     * loadSpecificationContents()
     * 
     * loads the specification contents.
     * @returns the specification class contents.
     */

    public async loadSpecificationContents(): Promise<string> {
        const file = await FileSystem.Open(SpecificationArtifact.SPECIFICATION_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();

        return contents
            .replace(/__SPECIFICATION_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(SpecificationArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "specifications");
    }
}