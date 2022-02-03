"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * QueryArtifact
 *
 * An artifact for constructing a Query.
 */
class QueryArtifact extends artifact_1.Artifact {
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
        this.moduleQueriesDirPath = filesystem_1.Path.FromSegments(this.modulePath, "services");
        this.moduleQueriesWellFilePath = filesystem_1.Path.FromSegments(this.moduleQueriesDirPath, "services.well.ts");
        this.queryPath = filesystem_1.Path.FromSegments(this.moduleQueriesDirPath, this.details.artifactDirPath());
        this.queryClassPath = filesystem_1.Path.FromSegments(this.queryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.query.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.queryPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleQueriesWellFilePath)) {
            const eventsWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleQueriesWellFilePath, eventsWellFileContent);
        }
        // interfaces and classes.
        const classContent = await this.loadQueryContents();
        filesMap.set(this.queryClassPath, classContent);
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
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.query";`;
        exports.set(this.moduleQueriesWellFilePath, classContent);
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
            if (await filesystem_1.FileSystem.Contains(this.queryClassPath)) {
                throw new Error(`Query '${this.stringFormatter.classNameCase(this.details.artifactName())}Query' already exists.`);
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
     * loadQueryContents()
     *
     * loads the query contents.
     * @returns the query class contents.
     */
    async loadQueryContents() {
        const file = await filesystem_1.FileSystem.Open(QueryArtifact.QUERY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__QUERY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for an exceptions well file..
     * @returns the contents for the exceptions well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(QueryArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "services");
    }
}
exports.QueryArtifact = QueryArtifact;
// templates
QueryArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
QueryArtifact.QUERY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "QUERY.template.txt");
//# sourceMappingURL=query.artifact.js.map