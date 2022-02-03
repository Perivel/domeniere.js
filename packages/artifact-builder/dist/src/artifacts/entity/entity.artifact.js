"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * EntityArtifact
 *
 * An artifact for constructing an entity.
 */
class EntityArtifact extends artifact_1.Artifact {
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
        this.moduleEntitiesDirPath = filesystem_1.Path.FromSegments(this.modulePath, "entities");
        this.moduleEntitiesWellFilePath = filesystem_1.Path.FromSegments(this.moduleEntitiesDirPath, "entities.well.ts");
        this.entityPath = filesystem_1.Path.FromSegments(this.moduleEntitiesDirPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.entityPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleEntitiesWellFilePath)) {
            const entitiesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleEntitiesWellFilePath, entitiesWellFileContent);
        }
        // interfaces and classes.
        const interfaceFilePath = filesystem_1.Path.FromSegments(this.entityPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        const classFilePath = filesystem_1.Path.FromSegments(this.entityPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
        const interfaceContents = await this.loadInterfaceContents();
        let classContent = "";
        if (this.isTimestamped) {
            // load timestamped templates
            classContent = await this.loadTimestampedEntityContents();
        }
        else {
            // load regular templates.
            classContent = await this.loadEntityContents();
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
        exports.set(this.moduleFilePath, `\nexport * from "./entities/entities.well";`);
        // export entity files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + filesystem_1.Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleEntitiesWellFilePath, content);
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
            // make sure the entity does not already exist.
            if (await filesystem_1.FileSystem.Contains(this.entityPath)) {
                throw new Error(`Entity '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
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
     * loadEntityContents()
     *
     * loads the entity contents.
     * @returns the entity class contents.
     */
    async loadEntityContents() {
        const file = await filesystem_1.FileSystem.Open(EntityArtifact.ENTITY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__ENTITY_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__ENTITY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadInterfaceContents()
     *
     * loads the interface contents.
     * @returns the interface contents.
     */
    async loadInterfaceContents() {
        const file = await filesystem_1.FileSystem.Open(EntityArtifact.INTERFACE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadTimestampedEntityContents()
     *
     * loads the timestamped entity contents.
     * @returns the timstamped entity class contents.
     */
    async loadTimestampedEntityContents() {
        const file = await filesystem_1.FileSystem.Open(EntityArtifact.TIMESTAMPED_ENTITY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents
            .replace(/__ENTITY_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__ENTITY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(EntityArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "entities");
    }
}
exports.EntityArtifact = EntityArtifact;
// templates
EntityArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
EntityArtifact.INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "INTERFACE.template.txt");
EntityArtifact.ENTITY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "ENTITY.template.txt");
EntityArtifact.TIMESTAMPED_ENTITY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "TIMESTAMPED_ENTITY.template.txt");
//# sourceMappingURL=entity.artifact.js.map