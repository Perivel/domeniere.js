"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const validators_well_1 = require("../../validators/validators.well");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("../../formatters/formatters.well");
/**
 * ValuesArtifact
 *
 * The values artifact.
 */
class ValueArtifact extends artifact_1.Artifact {
    constructor(input, projectRoot, isIdentifier = false) {
        super();
        this.isIdentifier = isIdentifier;
        this.moduleValidator = new validators_well_1.ModuleValidator();
        this.inputParser = new artifact_details_parrser_well_1.ArtifactDetailsParser();
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
        this.details = this.inputParser.parse(input);
        this.projectRoot = projectRoot;
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleValuesPath = filesystem_1.Path.FromSegments(this.modulePath, "values");
        this.moduleValuesWellFilePath = filesystem_1.Path.FromSegments(this.moduleValuesPath, "values.well.ts");
        this.valuePath = filesystem_1.Path.FromSegments(this.moduleValuesPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));
        this.valueInterfacePath = filesystem_1.Path.FromSegments(this.valuePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        this.valueClassPath = filesystem_1.Path.FromSegments(this.valuePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.valuePath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file if it does not already exist.
        if (!await filesystem_1.FileSystem.Contains(this.moduleValuesWellFilePath)) {
            const wellContents = await this.loadWellContents();
            filesMap.set(this.moduleValuesWellFilePath, wellContents);
        }
        // load interface and class contents.
        let interfaceContents = "";
        let classContents = "";
        if (this.isIdentifier) {
            // load identifier contents.
            interfaceContents = await this.loadIdentifierInterfaceContents();
            classContents = await this.loadIdentifierClassContents();
        }
        else {
            // load regular contents.
            interfaceContents = await this.loadInterfaceContents();
            classContents = await this.loadClassContents();
        }
        filesMap.set(this.valueInterfacePath, interfaceContents);
        filesMap.set(this.valueClassPath, classContents);
        return filesMap;
    }
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    async exportsInfo() {
        const exports = new Map();
        // well file.
        exports.set(filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`), `\nexport * from "./values/values.well";`);
        // add the value exports.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleValuesWellFilePath, content);
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
            // make sure we are in a domeniere project.
            const domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
            if (!await filesystem_1.FileSystem.Contains(domconfigPath)) {
                throw new Error("Not a Domeniere project.");
            }
            // make sure the module exists.
            if (!await this.moduleValidator.pathIsModule(this.modulePath, this.stringFormatter.fileNameCase(this.details.module()))) {
                throw new Error(`Module '${this.stringFormatter.classNameCase(this.details.module())}' does not exist.`);
            }
            // make sure the value does not already exist.
            if (await filesystem_1.FileSystem.Contains(this.valuePath)) {
                throw new Error(`Value '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
            }
            // all valid
            return null;
        }
        catch (e) {
            return e.message;
        }
    }
    // ====================================
    // helpers
    // ====================================
    /**
     * loadClassContents()
     *
     * loads the contents for a regular value class.
     * @returns the contents for the value class
     */
    async loadClassContents() {
        const file = await filesystem_1.FileSystem.Open(ValueArtifact.VALUE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content
            .replace(/__VALUE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__VALUE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()));
    }
    /**
     * loadIdentifierClassContents()
     *
     * loads the contents for an identifier value class.
     * @returns the contents for the value class
     */
    async loadIdentifierClassContents() {
        const file = await filesystem_1.FileSystem.Open(ValueArtifact.IDENTIFIER_VALUE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content
            .replace(/__VALUE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__VALUE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()));
    }
    /**
     * loadIdentifierInterfaceContents()
     *
     * loads the contents for an identifer interface.
     * @returns the contents for the value interface.
     */
    async loadIdentifierInterfaceContents() {
        const file = await filesystem_1.FileSystem.Open(ValueArtifact.IDENTIFIER_INTERFACE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadInterfaceContents()
     *
     * loads the contents for a regular interface.
     * @returns the contents for the value interface.
     */
    async loadInterfaceContents() {
        const file = await filesystem_1.FileSystem.Open(ValueArtifact.INTERFACE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(ValueArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "values");
    }
}
exports.ValueArtifact = ValueArtifact;
ValueArtifact.INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "INTERFACE.template.txt");
ValueArtifact.IDENTIFIER_INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "IDENTIFIER_INTERFACE.template.txt");
ValueArtifact.VALUE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "VALUE.template.txt");
ValueArtifact.IDENTIFIER_VALUE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "IDENTIFIER_VALUE.template.txt");
ValueArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
//# sourceMappingURL=value.artifact.js.map