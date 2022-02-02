import { File, FileOpenFlag, FileOpenMode, FileSystem, Path } from "@swindle/filesystem";
import { DomeniereStringFormatter } from "../../formatters/domeniere-string-formatter/domeniere-string.formatter";
import { DomConfig } from "../../interfaces/domconfig.interface";
import { Artifact } from "./../../artifact/artifact";
import { ModuleValidator } from "./../../validators/validators.well";

/**
 * ModuleArtifact 
 * 
 * An artifact fr creating a module.
 */

export class ModuleArtifact extends Artifact {

    private static MODULE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "MODULE.template.txt");

    private readonly moduleName: string;
    private readonly projectRoot: Path;
    private readonly domconfigPath: Path;
    private readonly modulePath: Path;
    private readonly indexPath: Path;

    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly moduleValidator: ModuleValidator;

    constructor(
        moduleName: string,
        projectRoot: Path
    ) {
        super();
        this.moduleName = moduleName;
        this.projectRoot = projectRoot;
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.indexPath = Path.FromSegments(this.projectRoot, "index.ts");

        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.moduleName));
    }

    /**
     * directoriesInfo()
     * 
     * The directories to be created for this module.
     */

    public directoriesInfo(): Path[] {
        return [this.modulePath]
    }

    /**
     * filesInfo()
     * 
     * The information about the files to be created.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // module path.
        const moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.moduleName)}.module.ts`);
        const content = await this.loadModuleContents();
        filesMap.set(moduleFilePath, content);

        return filesMap;
    }

    /**
     * exportsInfo()
     * 
     * The information regarding any exports. 
     */

    public async exportsInfo(): Promise<Map<Path, string>> {
        const exports = new Map<Path, string>();

        // the module file.
        const modulePathNameSegment = this.stringFormatter.fileNameCase(this.moduleName);
        const exportPath = new Path(`.\\src\\${modulePathNameSegment}\\${modulePathNameSegment}.module`);
    const content = `\nexport * from "${exportPath.toString()}";`;
        exports.set(this.indexPath, content);

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
        
        // make sure we are in a Domeniere project.
        if (!await FileSystem.Contains(this.domconfigPath)) {
            return `Not a Domeniere project.`;
        }

        // make sure the module name is valid.

        if (!this.moduleValidator.moduleNameIsValid(this.moduleName)) {
            return "Invalid module name.";
        }

        // make sure the module does not already exist.
        if (await FileSystem.Contains(this.modulePath)) {
            return `Module ${this.stringFormatter.classNameCase(this.moduleName)} already exists.`;
        }

        return null;
    }
    
    // =======================================
    // helpers.
    // =======================================

    /**
     * loadDomConfig()
     * 
     * loads the domconfig contents.
     * @returns the DomConfig object.
     */

    private async loadDomConfig(): Promise<DomConfig> {
        const domConfigFile = await FileSystem.Open(this.domconfigPath, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await domConfigFile.readAll();
        await domConfigFile.close();
        return JSON.parse(contents) as DomConfig;
    }

    /**
     * loadModleContents()
     * 
     * loads the module contents.
     * @returns the module content.
     */

    private async loadModuleContents(): Promise<string> {
        const file = await FileSystem.Open(ModuleArtifact.MODULE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__MODULE_NAME__/g, this.stringFormatter.classNameCase(this.moduleName))
            .replace(/__MODULE_PATH__/g, this.stringFormatter.fileNameCase(this.moduleName));
    }
}