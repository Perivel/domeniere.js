"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const domeniere_string_formatter_1 = require("../../formatters/domeniere-string-formatter/domeniere-string.formatter");
const artifact_1 = require("./../../artifact/artifact");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * ModuleArtifact
 *
 * An artifact fr creating a module.
 */
class ModuleArtifact extends artifact_1.Artifact {
    constructor(moduleName, projectRoot) {
        super();
        this.moduleName = moduleName;
        this.projectRoot = projectRoot;
        this.domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
        this.indexPath = filesystem_1.Path.FromSegments(this.projectRoot, "index.ts");
        this.stringFormatter = new domeniere_string_formatter_1.DomeniereStringFormatter();
        this.moduleValidator = new validators_well_1.ModuleValidator();
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.moduleName));
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for this module.
     */
    directoriesInfo() {
        return [this.modulePath];
    }
    /**
     * filesInfo()
     *
     * The information about the files to be created.
     */
    async filesInfo() {
        const filesMap = new Map();
        // module path.
        const moduleFilePath = filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.moduleName)}.module.ts`);
        const content = await this.loadModuleContents();
        filesMap.set(moduleFilePath, content);
        return filesMap;
    }
    /**
     * exportsInfo()
     *
     * The information regarding any exports.
     */
    async exportsInfo() {
        const exports = new Map();
        // the module file.
        const modulePathNameSegment = this.stringFormatter.fileNameCase(this.moduleName);
        const exportPath = new filesystem_1.Path(`.\\src\\${modulePathNameSegment}\\${modulePathNameSegment}.module`);
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
    async validate() {
        // make sure we are in a Domeniere project.
        if (!await filesystem_1.FileSystem.Contains(this.domconfigPath)) {
            return `Not a Domeniere project.`;
        }
        // make sure the module name is valid.
        if (!this.moduleValidator.moduleNameIsValid(this.moduleName)) {
            return "Invalid module name.";
        }
        // make sure the module does not already exist.
        if (await filesystem_1.FileSystem.Contains(this.modulePath)) {
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
    async loadDomConfig() {
        const domConfigFile = await filesystem_1.FileSystem.Open(this.domconfigPath, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await domConfigFile.readAll();
        await domConfigFile.close();
        return JSON.parse(contents);
    }
    /**
     * loadModleContents()
     *
     * loads the module contents.
     * @returns the module content.
     */
    async loadModuleContents() {
        const file = await filesystem_1.FileSystem.Open(ModuleArtifact.MODULE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__MODULE_NAME__/g, this.stringFormatter.classNameCase(this.moduleName))
            .replace(/__MODULE_PATH__/g, this.stringFormatter.fileNameCase(this.moduleName));
    }
}
exports.ModuleArtifact = ModuleArtifact;
ModuleArtifact.MODULE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "MODULE.template.txt");
//# sourceMappingURL=module.artifact.js.map