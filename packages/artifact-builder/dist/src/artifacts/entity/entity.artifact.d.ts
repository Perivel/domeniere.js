import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * EntityArtifact
 *
 * An artifact for constructing an entity.
 */
export declare class EntityArtifact extends Artifact {
    private static WELL_PATH;
    private static INTERFACE_PATH;
    private static ENTITY_PATH;
    private static TIMESTAMPED_ENTITY_PATH;
    private readonly projectRoot;
    private readonly details;
    private readonly isTimestamped;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly moduleFilePath;
    private readonly moduleEntitiesDirPath;
    private readonly moduleEntitiesWellFilePath;
    private readonly entityPath;
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
     * loadEntityContents()
     *
     * loads the entity contents.
     * @returns the entity class contents.
     */
    loadEntityContents(): Promise<string>;
    /**
     * loadInterfaceContents()
     *
     * loads the interface contents.
     * @returns the interface contents.
     */
    loadInterfaceContents(): Promise<string>;
    /**
     * loadTimestampedEntityContents()
     *
     * loads the timestamped entity contents.
     * @returns the timstamped entity class contents.
     */
    loadTimestampedEntityContents(): Promise<string>;
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=entity.artifact.d.ts.map