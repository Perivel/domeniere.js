import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * ValuesArtifact
 *
 * The values artifact.
 */
export declare class ValueArtifact extends Artifact {
    private static INTERFACE_PATH;
    private static IDENTIFIER_INTERFACE_PATH;
    private static VALUE_PATH;
    private static IDENTIFIER_VALUE_PATH;
    private static WELL_PATH;
    private details;
    private readonly projectRoot;
    private readonly inputParser;
    private readonly stringFormatter;
    private readonly moduleValidator;
    private readonly valuePath;
    private readonly modulePath;
    private readonly moduleValuesPath;
    private readonly isIdentifier;
    private readonly moduleValuesWellFilePath;
    private readonly valueInterfacePath;
    private readonly valueClassPath;
    constructor(input: string, projectRoot: Path, isIdentifier?: boolean);
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
     * loadClassContents()
     *
     * loads the contents for a regular value class.
     * @returns the contents for the value class
     */
    private loadClassContents;
    /**
     * loadIdentifierClassContents()
     *
     * loads the contents for an identifier value class.
     * @returns the contents for the value class
     */
    private loadIdentifierClassContents;
    /**
     * loadIdentifierInterfaceContents()
     *
     * loads the contents for an identifer interface.
     * @returns the contents for the value interface.
     */
    private loadIdentifierInterfaceContents;
    /**
     * loadInterfaceContents()
     *
     * loads the contents for a regular interface.
     * @returns the contents for the value interface.
     */
    private loadInterfaceContents;
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    private loadWellContents;
}
//# sourceMappingURL=value.artifact.d.ts.map