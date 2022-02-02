"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * EventArtifact
 *
 * An artifact for constructing an Event.
 */
class EventArtifact extends artifact_1.Artifact {
    constructor(details, projectRoot, shouldBroadcast = true, isError = false) {
        super();
        // utilities
        this.inputParser = new artifact_details_parrser_well_1.ArtifactDetailsParser();
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
        this.moduleValidator = new validators_well_1.ModuleValidator();
        // data
        this.projectRoot = projectRoot;
        this.shouldBroadcast = shouldBroadcast;
        this.isError = isError;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleEventsDirPath = filesystem_1.Path.FromSegments(this.modulePath, "events");
        this.moduleEventsWellFilePath = filesystem_1.Path.FromSegments(this.moduleEventsDirPath, "events.well.ts");
        this.eventPath = filesystem_1.Path.FromSegments(this.moduleEventsDirPath, this.details.artifactDirPath());
        this.eventClassPath = filesystem_1.Path.FromSegments(this.eventPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.event.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.eventPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleEventsWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleEventsWellFilePath, eventsWellFileContent);
        }
        // interfaces and classes.
        const classContent = await this.loadEventContents();
        filesMap.set(this.eventClassPath, classContent);
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
        exports.set(this.moduleFilePath, `\nexport * from "./events/events.well";`);
        // export events files to entities well file.
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.event";`;
        exports.set(this.moduleEventsWellFilePath, classContent);
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
            if (await filesystem_1.FileSystem.Contains(this.eventClassPath)) {
                throw new Error(`Event '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadDomConfigContents()
     *
     * loads the domconfig contents.
     * @returns the domconfig contents.
     */
    async loadDomconfigContents() {
        const file = await filesystem_1.FileSystem.Open(this.domconfigPath, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return JSON.parse(contents);
    }
    /**
     * loadEventContents()
     *
     * loads the event contents.
     * @returns the event class contents.
     */
    async loadEventContents() {
        const file = await filesystem_1.FileSystem.Open(EventArtifact.EVENT_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        // load the domconfig.
        const domconfig = await this.loadDomconfigContents();
        return contents
            .replace(/__EVENT_CLASS_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__EVENT_CLASSIFICATION__/g, this.stringFormatter.fileNameCase(domconfig.name))
            .replace(/__EVENT_STRING_NAME__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__ERROR_EVENT__/g, this.isError ? "true" : "false")
            .replace(/__BROADCAST_EVENT__/g, this.shouldBroadcast ? "true" : "false");
    }
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(EventArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "exceptions");
    }
}
exports.EventArtifact = EventArtifact;
// templates
EventArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
EventArtifact.EVENT_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "EVENT.template.txt");
//# sourceMappingURL=event.artifact.js.map