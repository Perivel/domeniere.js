"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * exceptionArtifact
 *
 * An artifact for constructing an Exception.
 */
class ExceptionArtifact extends artifact_1.Artifact {
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
        this.moduleExceptionsDirPath = filesystem_1.Path.FromSegments(this.modulePath, "exceptions");
        this.moduleExceptionWellFilePath = filesystem_1.Path.FromSegments(this.moduleExceptionsDirPath, "exceptions.well.ts");
        this.exceptionPath = filesystem_1.Path.FromSegments(this.moduleExceptionsDirPath, this.details.artifactDirPath());
        this.exceptionClassPath = filesystem_1.Path.FromSegments(this.exceptionPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.exception.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.exceptionPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleExceptionWellFilePath)) {
            const factoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleExceptionWellFilePath, factoriesWellFileContent);
        }
        // interfaces and classes.
        const classContent = await this.loadExceptionContents();
        filesMap.set(this.exceptionClassPath, classContent);
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
        exports.set(this.moduleFilePath, `\nexport * from "./exceptions/exceptions.well";`);
        // export factories files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.exception";`;
        exports.set(this.moduleExceptionWellFilePath, classContent);
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
            if (await filesystem_1.FileSystem.Contains(this.exceptionClassPath)) {
                throw new Error(`Exception '${this.stringFormatter.classNameCase(this.details.artifactName())}Exception' already exists.`);
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
     * loadExceptionContents()
     *
     * loads the exception contents.
     * @returns the exception class contents.
     */
    async loadExceptionContents() {
        const file = await filesystem_1.FileSystem.Open(ExceptionArtifact.EXCEPTION_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__EXCEPTION_TEXT__/g, this.stringFormatter.capitalCase(this.details.artifactName()))
            .replace(/__EXCEPTION_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(ExceptionArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "exceptions");
    }
}
exports.ExceptionArtifact = ExceptionArtifact;
// templates
ExceptionArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
ExceptionArtifact.EXCEPTION_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "EXCEPTION.template.txt");
//# sourceMappingURL=exception.artifact.js.map