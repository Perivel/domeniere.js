"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * CommandArtifact
 *
 * An artifact for constructing a Command.
 */
class CommandArtifact extends artifact_1.Artifact {
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
        this.moduleCommandsDirPath = filesystem_1.Path.FromSegments(this.modulePath, "services");
        this.moduleCommandsWellFilePath = filesystem_1.Path.FromSegments(this.moduleCommandsDirPath, "services.well.ts");
        this.commandPath = filesystem_1.Path.FromSegments(this.moduleCommandsDirPath, this.details.artifactDirPath());
        this.commandClassPath = filesystem_1.Path.FromSegments(this.commandPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.command.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.commandPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleCommandsWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleCommandsWellFilePath, eventsWellFileContent);
        }
        // interfaces and classes.
        const classContent = await this.loadCommandContents();
        filesMap.set(this.commandClassPath, classContent);
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
        exports.set(this.moduleFilePath, `\nexport * from "./services/services.well";`);
        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.command";`;
        exports.set(this.moduleCommandsWellFilePath, classContent);
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
            if (await filesystem_1.FileSystem.Contains(this.commandClassPath)) {
                throw new Error(`Command '${this.stringFormatter.classNameCase(this.details.artifactName())}Command' already exists.`);
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
     * loadCommandContents()
     *
     * loads the command contents.
     * @returns the command class contents.
     */
    async loadCommandContents() {
        const file = await filesystem_1.FileSystem.Open(CommandArtifact.COMMAND_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__COMMAND_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(CommandArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "services");
    }
}
exports.CommandArtifact = CommandArtifact;
// templates
CommandArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
CommandArtifact.COMMAND_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "COMMAND.template.txt");
//# sourceMappingURL=command.artifact.js.map