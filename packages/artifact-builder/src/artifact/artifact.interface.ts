import { Path } from "@swindle/filesystem";

export interface ArtifactInterface {

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
    
    validate(): Promise<string|null>;
}