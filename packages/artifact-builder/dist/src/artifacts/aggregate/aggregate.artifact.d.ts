import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * AggregateArtifact
 *
 * An artifact for constructing an aggregate.
 */
export declare class AggregateArtifact extends Artifact {
    private static WELL_PATH;
    private static INTERFACE_PATH;
    private static AGGREGATE_PATH;
    private static TIMESTAMPED_AGGREGATE_PATH;
    private readonly projectRoot;
    private readonly details;
    private readonly isTimestamped;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly moduleFilePath;
    private readonly moduleAggregatesDirPath;
    private readonly moduleAggregatesWellFilePath;
    private readonly aggregatePath;
    private readonly stringFormatter;
    private readonly inputParser;
    private readonly moduleValidator;
    constructor(details: string, projectRoot: Path, isTimestamped?: boolean);
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
     * loadAggregateContents()
     *
     * loads the aggregate contents.
     * @returns the aggregate class contents.
     */
    loadAggregateContents(): Promise<string>;
    /**
     * loadInterfaceContents()
     *
     * loads the interface contents.
     * @returns the interface contents.
     */
    loadInterfaceContents(): Promise<string>;
    /**
     * loadTimestampedAggregateContents()
     *
     * loads the timestamped aggregate contents.
     * @returns the timstamped aggregate class contents.
     */
    loadTimestampedAggregateContents(): Promise<string>;
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=aggregate.artifact.d.ts.map