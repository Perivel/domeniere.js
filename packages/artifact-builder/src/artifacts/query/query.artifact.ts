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
 * QueryArtifact
 * 
 * An artifact for constructing a Query.
 */

export class QueryArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static QUERY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "QUERY.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the Query directory for the module.
    private readonly moduleQueriesDirPath: Path;

    // the command well file path for the module.
    private readonly moduleQueriesWellFilePath: Path;

    // the directory of the Query to create.
    private readonly queryPath: Path;
    private readonly queryClassPath: Path;

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
        this.moduleQueriesDirPath = Path.FromSegments(this.modulePath, "services");
        this.moduleQueriesWellFilePath = Path.FromSegments(this.moduleQueriesDirPath, "services.well.ts");
        this.queryPath = Path.FromSegments(this.moduleQueriesDirPath, this.details.artifactDirPath());
        this.queryClassPath = Path.FromSegments(this.queryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.query.ts`);
    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.queryPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleQueriesWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleQueriesWellFilePath, eventsWellFileContent);
        }

        // interfaces and classes.
        const classContent = await this.loadQueryContents();
        filesMap.set(this.queryClassPath, classContent);

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
        exports.set(this.moduleFilePath, `\nexport * from "./services/services.well";`);

        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.query";`;
        exports.set(this.moduleQueriesWellFilePath, classContent);

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
            if (await FileSystem.Contains(this.queryClassPath)) {
                throw new Error(`Query '${this.stringFormatter.classNameCase(this.details.artifactName())}Query' already exists.`);
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
     * loadQueryContents()
     * 
     * loads the query contents.
     * @returns the query class contents.
     */

    public async loadQueryContents(): Promise<string> {
        const file = await FileSystem.Open(QueryArtifact.QUERY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();

        return contents
            .replace(/__QUERY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(QueryArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "services");
    }
}