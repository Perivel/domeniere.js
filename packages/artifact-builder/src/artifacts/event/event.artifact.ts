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
 * EventArtifact
 * 
 * An artifact for constructing an Event.
 */

export class EventArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static EVENT_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "EVENT.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;
    private readonly shouldBroadcast: boolean;
    private readonly isError: boolean;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the events directory for the module.
    private readonly moduleEventsDirPath: Path;

    // the events well file path for the module.
    private readonly moduleEventsWellFilePath: Path;

    // the directory of the event to create.
    private readonly eventPath: Path;
    private readonly eventClassPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
        shouldBroadcast: boolean = true,
        isError: boolean = false
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.shouldBroadcast = shouldBroadcast;
        this.isError = isError;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleEventsDirPath = Path.FromSegments(this.modulePath, "events");
        this.moduleEventsWellFilePath = Path.FromSegments(this.moduleEventsDirPath, "events.well.ts");
        this.eventPath = Path.FromSegments(this.moduleEventsDirPath, this.details.artifactDirPath());
        this.eventClassPath = Path.FromSegments(this.eventPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.event.ts`);
    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.eventPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleEventsWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleEventsWellFilePath, eventsWellFileContent);
        }

        // interfaces and classes.
        const classContent = await this.loadEventContents();
        filesMap.set(this.eventClassPath, classContent);

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
        exports.set(this.moduleFilePath, `\nexport * from "./events/events.well";`);

        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.event";`;
        exports.set(this.moduleEventsWellFilePath, classContent);

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
            if (await FileSystem.Contains(this.eventClassPath)) {
                throw new Error(`Event '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadDomConfigContents()
     * 
     * loads the domconfig contents.
     * @returns the domconfig contents.
     */

    public async loadDomconfigContents(): Promise<DomConfig> {
        const file = await FileSystem.Open(this.domconfigPath, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return JSON.parse(contents) as DomConfig;
    }

    /**
     * loadEventContents()
     * 
     * loads the event contents.
     * @returns the event class contents.
     */

    public async loadEventContents(): Promise<string> {
        const file = await FileSystem.Open(EventArtifact.EVENT_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();

        // load the domconfig.
        const domconfig = await this.loadDomconfigContents();

        return contents
            .replace(/__EVENT_CLASS_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__EVENT_CLASSIFICATION__/g, this.stringFormatter.fileNameCase(domconfig.name))
            .replace(/__EVENT_STRING_NAME__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__ERROR_EVENT__/g, this.isError ? "true" : "false")
            .replace(/__BROADCAST_EVENT__/g, this.shouldBroadcast ? "true" : "false");
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(EventArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "exceptions");
    }
}