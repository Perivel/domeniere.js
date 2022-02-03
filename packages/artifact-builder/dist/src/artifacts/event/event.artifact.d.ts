import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
import { DomConfig } from "../../interfaces/domconfig.interface";
/**
 * EventArtifact
 *
 * An artifact for constructing an Event.
 */
export declare class EventArtifact extends Artifact {
    private static WELL_PATH;
    private static EVENT_PATH;
    private readonly projectRoot;
    private readonly details;
    private readonly shouldBroadcast;
    private readonly isError;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly moduleFilePath;
    private readonly moduleEventsDirPath;
    private readonly moduleEventsWellFilePath;
    private readonly eventPath;
    private readonly eventClassPath;
    private readonly stringFormatter;
    private readonly inputParser;
    private readonly moduleValidator;
    constructor(details: string, projectRoot: Path, shouldBroadcast?: boolean, isError?: boolean);
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
     * loadDomConfigContents()
     *
     * loads the domconfig contents.
     * @returns the domconfig contents.
     */
    loadDomconfigContents(): Promise<DomConfig>;
    /**
     * loadEventContents()
     *
     * loads the event contents.
     * @returns the event class contents.
     */
    loadEventContents(): Promise<string>;
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=event.artifact.d.ts.map