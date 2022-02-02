"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * FactoryArtifact
 *
 * An artifact for constructing a factory.
 */
class FactoryArtifact extends artifact_1.Artifact {
    constructor(details, projectRoot) {
        super();
        // utilities
        this.inputParser = new artifact_details_parrser_well_1.ArtifactDetailsParser();
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
        this.moduleValidator = new validators_well_1.ModuleValidator();
        // data
        this.projectRoot = projectRoot;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleFactoriesDirPath = filesystem_1.Path.FromSegments(this.modulePath, "factories");
        this.moduleFactoriesWellFilePath = filesystem_1.Path.FromSegments(this.moduleFactoriesDirPath, "factories.well.ts");
        this.factoryPath = filesystem_1.Path.FromSegments(this.moduleFactoriesDirPath, this.details.artifactDirPath(), `${this.stringFormatter.fileNameCase(this.details.artifactName())}-factory`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.factoryPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleFactoriesWellFilePath)) {
            const factoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleFactoriesWellFilePath, factoriesWellFileContent);
        }
        // interfaces and classes.
        const interfaceFilePath = filesystem_1.Path.FromSegments(this.factoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}-factory.interface.ts`);
        const classFilePath = filesystem_1.Path.FromSegments(this.factoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.factory.ts`);
        const interfaceContents = await this.loadInterfaceContents();
        let classContent = await this.loadFactoryContents();
        filesMap.set(interfaceFilePath, interfaceContents);
        filesMap.set(classFilePath, classContent);
        return filesMap;
    }
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    async exportsInfo() {
        const exports = new Map();
        // export well file to module file.
        exports.set(this.moduleFilePath, `\nexport * from "./factories/factories.well";`);
        // export factories files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName() + "-factory") + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}-factory.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName() + "-factory") + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.factory";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleFactoriesWellFilePath, content);
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
        try {
            // make sure we are in a Domeniere project
            if (!await filesystem_1.FileSystem.Contains(this.domconfigPath)) {
                throw new Error("Not a Domeniere Project");
            }
            // make sure the module exists.
            if (!await this.moduleValidator.pathIsModule(this.modulePath, this.stringFormatter.fileNameCase(this.details.module()))) {
                throw new Error(`Module '${this.stringFormatter.classNameCase(this.details.module())}' does not exist.`);
            }
            // make sure the factory does not already exist.
            if (await filesystem_1.FileSystem.Contains(this.factoryPath)) {
                throw new Error(`Factory '${this.stringFormatter.classNameCase(this.details.artifactName())}Factory' already exists.`);
            }
            return null;
        }
        catch (e) {
            return e.message;
        }
    }
    // ================================
    // helpers
    // ================================
    /**
     * loadFactoryContents()
     *
     * loads the factory contents.
     * @returns the factory class contents.
     */
    async loadFactoryContents() {
        const file = await filesystem_1.FileSystem.Open(FactoryArtifact.FACTORY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__FACTORY_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__FACTORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadInterfaceContents()
     *
     * loads the interface contents.
     * @returns the interface contents.
     */
    async loadInterfaceContents() {
        const file = await filesystem_1.FileSystem.Open(FactoryArtifact.INTERFACE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(FactoryArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "factories");
    }
}
exports.FactoryArtifact = FactoryArtifact;
// templates
FactoryArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
FactoryArtifact.INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "FACTORY_INTERFACE.template.txt");
FactoryArtifact.FACTORY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "FACTORY.template.txt");
//# sourceMappingURL=factory.artifact.js.map