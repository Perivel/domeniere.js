"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * AggregateArtifact
 *
 * An artifact for constructing an aggregate.
 */
class AggregateArtifact extends artifact_1.Artifact {
    constructor(details, projectRoot, isTimestamped = false) {
        super();
        // utilities
        this.inputParser = new artifact_details_parrser_well_1.ArtifactDetailsParser();
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
        this.moduleValidator = new validators_well_1.ModuleValidator();
        // data
        this.projectRoot = projectRoot;
        this.isTimestamped = isTimestamped;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleAggregatesDirPath = filesystem_1.Path.FromSegments(this.modulePath, "aggregates");
        this.moduleAggregatesWellFilePath = filesystem_1.Path.FromSegments(this.moduleAggregatesDirPath, "aggregates.well.ts");
        this.aggregatePath = filesystem_1.Path.FromSegments(this.moduleAggregatesDirPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.aggregatePath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleAggregatesWellFilePath)) {
            const aggregatesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleAggregatesWellFilePath, aggregatesWellFileContent);
        }
        // interfaces and classes.
        const interfaceFilePath = filesystem_1.Path.FromSegments(this.aggregatePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        const classFilePath = filesystem_1.Path.FromSegments(this.aggregatePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
        const interfaceContents = await this.loadInterfaceContents();
        let classContent = "";
        if (this.isTimestamped) {
            // load timestamped templates
            classContent = await this.loadTimestampedAggregateContents();
        }
        else {
            // load regular templates.
            classContent = await this.loadAggregateContents();
        }
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
        exports.set(this.moduleFilePath, `\nexport * from "./aggregates/aggregates.well";`);
        // export aggregate files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleAggregatesWellFilePath, content);
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
            // make sure the aggregate does not already exist.
            if (await filesystem_1.FileSystem.Contains(this.aggregatePath)) {
                throw new Error(`Aggregate '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadAggregateContents()
     *
     * loads the aggregate contents.
     * @returns the aggregate class contents.
     */
    async loadAggregateContents() {
        const file = await filesystem_1.FileSystem.Open(AggregateArtifact.AGGREGATE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__AGGREGATE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__AGGREGATE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadInterfaceContents()
     *
     * loads the interface contents.
     * @returns the interface contents.
     */
    async loadInterfaceContents() {
        const file = await filesystem_1.FileSystem.Open(AggregateArtifact.INTERFACE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadTimestampedAggregateContents()
     *
     * loads the timestamped aggregate contents.
     * @returns the timstamped aggregate class contents.
     */
    async loadTimestampedAggregateContents() {
        const file = await filesystem_1.FileSystem.Open(AggregateArtifact.TIMESTAMPED_AGGREGATE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents
            .replace(/__AGGREGATE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__AGGREGATE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(AggregateArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "aggregates");
    }
}
exports.AggregateArtifact = AggregateArtifact;
// templates
AggregateArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
AggregateArtifact.INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "INTERFACE.template.txt");
AggregateArtifact.AGGREGATE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "AGGREGATE.template.txt");
AggregateArtifact.TIMESTAMPED_AGGREGATE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "TIMESTAMPED_AGGREGATE.template.txt");
//# sourceMappingURL=aggregate.artifact.js.map