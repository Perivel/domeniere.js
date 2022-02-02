"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * DtoArtifact
 *
 * An artifact for constructing an Dto.
 */
class DtoArtifact extends artifact_1.Artifact {
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
        this.moduleDtosDirPath = filesystem_1.Path.FromSegments(this.modulePath, "data");
        this.moduleDtosWellFilePath = filesystem_1.Path.FromSegments(this.moduleDtosDirPath, "data.well.ts");
        this.dtoPath = filesystem_1.Path.FromSegments(this.moduleDtosDirPath, this.details.artifactDirPath());
        this.dtoClassPath = filesystem_1.Path.FromSegments(this.dtoPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.data.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.dtoPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleDtosWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleDtosWellFilePath, eventsWellFileContent);
        }
        // interfaces and classes.
        const classContent = await this.loadDtoContents();
        filesMap.set(this.dtoClassPath, classContent);
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
        exports.set(this.moduleFilePath, `\nexport * from "./data/data.well";`);
        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.data";`;
        exports.set(this.moduleDtosWellFilePath, classContent);
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
            // make sure the event does not already exist.
            if (await filesystem_1.FileSystem.Contains(this.dtoClassPath)) {
                throw new Error(`Dto '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadDtoContents()
     *
     * loads the dto contents.
     * @returns the dto class contents.
     */
    async loadDtoContents() {
        const file = await filesystem_1.FileSystem.Open(DtoArtifact.DTO_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__DTO_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(DtoArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "dtos");
    }
}
exports.DtoArtifact = DtoArtifact;
// templates
DtoArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
DtoArtifact.DTO_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "DTO.template.txt");
//# sourceMappingURL=dto.artifact.js.map