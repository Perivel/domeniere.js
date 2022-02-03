import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * CommandArtifact
 *
 * An artifact for constructing a Command.
 */
export declare class CommandArtifact extends Artifact {
    private static WELL_PATH;
    private static COMMAND_PATH;
    private readonly projectRoot;
    private readonly details;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly moduleFilePath;
    private readonly moduleCommandsDirPath;
    private readonly moduleCommandsWellFilePath;
    private readonly commandPath;
    private readonly commandClassPath;
    private readonly stringFormatter;
    private readonly inputParser;
    private readonly moduleValidator;
    constructor(details: string, projectRoot: Path);
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
     * loadCommandContents()
     *
     * loads the command contents.
     * @returns the command class contents.
     */
    loadCommandContents(): Promise<string>;
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=command.artifact.d.ts.map