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
 * AggregateArtifact
 * 
 * An artifact for constructing an aggregate.
 */

export class AggregateArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "INTERFACE.template.txt");
    private static AGGREGATE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "AGGREGATE.template.txt");
    private static TIMESTAMPED_AGGREGATE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "TIMESTAMPED_AGGREGATE.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;
    private readonly isTimestamped: boolean;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the aggregates directory for the module.
    private readonly moduleAggregatesDirPath: Path;

    // the aggregates well file path for the module.
    private readonly moduleAggregatesWellFilePath: Path;

    // the directory of the aggregate to create.
    private readonly aggregatePath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
        isTimestamped: boolean = false
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.isTimestamped = isTimestamped;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleAggregatesDirPath = Path.FromSegments(this.modulePath, "aggregates");
        this.moduleAggregatesWellFilePath = Path.FromSegments(this.moduleAggregatesDirPath, "aggregates.well.ts");
        this.aggregatePath = Path.FromSegments(this.moduleAggregatesDirPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));

    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.aggregatePath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleAggregatesWellFilePath)) {
            const aggregatesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleAggregatesWellFilePath, aggregatesWellFileContent);
        }

        // interfaces and classes.
        const interfaceFilePath = Path.FromSegments(this.aggregatePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        const classFilePath = Path.FromSegments(this.aggregatePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
        const interfaceContents = await this.loadInterfaceContents();
        let classContent = "";

        if (this.isTimestamped) {
            // load timestamped templates
            classContent = await this.loadTimestampedAggregateContents();
        }
        else {
            // load regular templates.
            classContent = await this.loadAggregateContents();
        }
        filesMap.set(interfaceFilePath, interfaceContents);
        filesMap.set(classFilePath, classContent);

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
        exports.set(this.moduleFilePath, `\nexport * from "./aggregates/aggregates.well";`);

        // export aggregate files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleAggregatesWellFilePath, content);

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

            // make sure the aggregate does not already exist.
            if (await FileSystem.Contains(this.aggregatePath)) {
                throw new Error(`Aggregate '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadAggregateContents()
     * 
     * loads the aggregate contents.
     * @returns the aggregate class contents.
     */

    public async loadAggregateContents(): Promise<string> {
        const file = await FileSystem.Open(AggregateArtifact.AGGREGATE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__AGGREGATE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__AGGREGATE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadInterfaceContents()
     * 
     * loads the interface contents.
     * @returns the interface contents.
     */

    public async loadInterfaceContents(): Promise<string> {
        const file = await FileSystem.Open(AggregateArtifact.INTERFACE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadTimestampedAggregateContents()
     * 
     * loads the timestamped aggregate contents.
     * @returns the timstamped aggregate class contents.
     */

    public async loadTimestampedAggregateContents(): Promise<string> {
        const file = await FileSystem.Open(AggregateArtifact.TIMESTAMPED_AGGREGATE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents
            .replace(/__AGGREGATE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__AGGREGATE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(AggregateArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "aggregates");
    }
}