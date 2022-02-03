import { Path } from "@swindle/filesystem";
import { ArtifactInterface } from "./artifact.interface";
/**
 * Artifact
 *
 * The base artifact.
 */
export declare abstract class Artifact implements ArtifactInterface {
    constructor();
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    abstract directoriesInfo(): Path[];
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    abstract filesInfo(): Promise<Map<Path, string>>;
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    abstract exportsInfo(): Promise<Map<Path, string>>;
    /**
     * validate()
     *
     * Perform any necessary validation. If the vallidation passes, null should be returned.
     * If the validation fails, a string consisting of the error message should be returned.
     *
     * If the validation fails (null is not returned), the artifact will not be built and an error will
     * be thrown.
     */
    abstract validate(): Promise<string | null>;
}
//# sourceMappingURL=artifact.d.ts.map