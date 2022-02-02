import { Path } from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
/**
 * ModuleArtifact
 *
 * An artifact fr creating a module.
 */
export declare class ModuleArtifact extends Artifact {
    private static MODULE_PATH;
    private readonly moduleName;
    private readonly projectRoot;
    private readonly domconfigPath;
    private readonly modulePath;
    private readonly indexPath;
    private readonly stringFormatter;
    private readonly moduleValidator;
    constructor(moduleName: string, projectRoot: Path);
    /**
     * directoriesInfo()
     *
     * The directories to be created for this module.
     */
    directoriesInfo(): Path[];
    /**
     * filesInfo()
     *
     * The information about the files to be created.
     */
    filesInfo(): Promise<Map<Path, string>>;
    /**
     * exportsInfo()
     *
     * The information regarding any exports.
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
     * loadDomConfig()
     *
     * loads the domconfig contents.
     * @returns the DomConfig object.
     */
    private loadDomConfig;
    /**
     * loadModleContents()
     *
     * loads the module contents.
     * @returns the module content.
     */
    private loadModuleContents;
}
//# sourceMappingURL=module.artifact.d.ts.map