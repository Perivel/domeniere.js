"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_1 = require("./../../artifact/artifact");
const artifact_details_parrser_well_1 = require("./../../artifact-details-parser/artifact-details-parrser.well");
const formatters_well_1 = require("./../../formatters/formatters.well");
const validators_well_1 = require("./../../validators/validators.well");
/**
 * RepositoryArtifact
 *
 * An artifact for constructing a repository.
 */
class RepositoryArtifact extends artifact_1.Artifact {
    constructor(details, projectRoot, isIdentityGenerating = false) {
        super();
        // utilities
        this.inputParser = new artifact_details_parrser_well_1.ArtifactDetailsParser();
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
        this.moduleValidator = new validators_well_1.ModuleValidator();
        // data
        this.projectRoot = projectRoot;
        this.isIdentityGenerating = isIdentityGenerating;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = filesystem_1.Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = filesystem_1.Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = filesystem_1.Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleRepositoriesDirPath = filesystem_1.Path.FromSegments(this.modulePath, "repositories");
        this.moduleRepositoriesWellFilePath = filesystem_1.Path.FromSegments(this.moduleRepositoriesDirPath, "repositories.well.ts");
        this.repositoryPath = filesystem_1.Path.FromSegments(this.moduleRepositoriesDirPath, this.details.artifactDirPath());
        this.repositoryClassPath = filesystem_1.Path.FromSegments(this.repositoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.repository.ts`);
    }
    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */
    directoriesInfo() {
        return [this.repositoryPath];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const filesMap = new Map();
        // well file.
        if (!await filesystem_1.FileSystem.Contains(this.moduleRepositoriesWellFilePath)) {
            const repositoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleRepositoriesWellFilePath, repositoriesWellFileContent);
        }
        // interfaces and classes.
        let classContent = "";
        if (this.isIdentityGenerating) {
            classContent = await this.loadIdentityRepositoryContents();
        }
        else {
            classContent = await this.loadRepositoryContents();
        }
        filesMap.set(this.repositoryClassPath, classContent);
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
        exports.set(this.moduleFilePath, `\nexport * from "./repositories/repositories.well";`);
        // export factories files to entities well file.
        const content = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + filesystem_1.Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName())}.repository";`;
        exports.set(this.moduleRepositoriesWellFilePath, content);
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
            if (await filesystem_1.FileSystem.Contains(this.repositoryClassPath)) {
                throw new Error(`Repository '${this.stringFormatter.classNameCase(this.details.artifactName())}Repository' already exists.`);
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
     * loadIdentityRepositoryContents()
     *
     * loads the identity repository contents.
     * @returns the idemtoty repository class contents.
     */
    async loadIdentityRepositoryContents() {
        const file = await filesystem_1.FileSystem.Open(RepositoryArtifact.IDENTITY_REPOSITORY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__REPOSITORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadRepositoryContents()
     *
     * loads the repository contents.
     * @returns the repository class contents.
     */
    async loadRepositoryContents() {
        const file = await filesystem_1.FileSystem.Open(RepositoryArtifact.REPOSITORY_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__REPOSITORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }
    /**
     * loadWellContents()
     *
     * loads the contents for a repositories well file..
     * @returns the contents for the values well file.
     */
    async loadWellContents() {
        const file = await filesystem_1.FileSystem.Open(RepositoryArtifact.WELL_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "repositories");
    }
}
exports.RepositoryArtifact = RepositoryArtifact;
// templates
RepositoryArtifact.WELL_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "WELL.template.txt");
RepositoryArtifact.INTERFACE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "FACTORY_INTERFACE.template.txt");
RepositoryArtifact.REPOSITORY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "REPOSITORY.template.txt");
RepositoryArtifact.IDENTITY_REPOSITORY_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "IDENTITY_REPOSITORY.template.txt");
//# sourceMappingURL=repository.artifact.js.map