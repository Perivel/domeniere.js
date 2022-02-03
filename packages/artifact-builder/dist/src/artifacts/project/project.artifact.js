"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectArtifact = void 0;
const filesystem_1 = require("@swindle/filesystem");
const domeniere_string_formatter_1 = require("../../formatters/domeniere-string-formatter/domeniere-string.formatter");
const artifact_1 = require("../../artifact/artifact");
/**
 * ProjectArtifact
 *
 * A Project artifact.
 *
 * An artifact representing a Domeniere Project.
 */
class ProjectArtifact extends artifact_1.Artifact {
    constructor(domainName, description, author, repositoryUrl, license, packageManager, targetDir) {
        super();
        this.domainName = domainName;
        this.description = description;
        this.author = author;
        this.repository = repositoryUrl;
        this.license = license;
        this.packageManager = packageManager;
        this.targetDir = targetDir;
        this.formatter = new domeniere_string_formatter_1.DomeniereStringFormatter();
        this.projectRootDirectory = filesystem_1.Path.FromSegments(this.targetDir, this.formatter.domainNameCase(this.domainName));
        this.projectSrcDirectory = filesystem_1.Path.FromSegments(this.projectRootDirectory, "src");
    }
    /**
     * directory()
     *
     * The directory where the artifacts will be contained.
     */
    directoriesInfo() {
        return [
            this.projectRootDirectory,
            this.projectSrcDirectory
        ];
    }
    /**
     * filesInfo()
     *
     * gets the information related to the files to be created for the artifact.
     */
    async filesInfo() {
        const fileMap = new Map();
        // =========================
        //  root directory
        // =========================
        // index
        const indexPath = filesystem_1.Path.FromSegments(this.projectRootDirectory, `index.ts`);
        const indexContents = await this.loadIndexContents();
        fileMap.set(indexPath, indexContents);
        // package.json
        const packageJsonPath = filesystem_1.Path.FromSegments(this.projectRootDirectory, "package.json");
        const packageJsonContents = await this.loadPackageJsonContents();
        fileMap.set(packageJsonPath, packageJsonContents);
        // domconfig
        const domconfigPath = filesystem_1.Path.FromSegments(this.projectRootDirectory, "domconfig.json");
        const domconfigContent = await this.loadDomConfigContents();
        fileMap.set(domconfigPath, domconfigContent);
        // gitignore
        const gitignorePath = filesystem_1.Path.FromSegments(this.projectRootDirectory, ".gitignore");
        const gitignoreContent = await this.loadGitignoreContents();
        fileMap.set(gitignorePath, gitignoreContent);
        // tsconfig.json
        const tsconfigPath = filesystem_1.Path.FromSegments(this.projectRootDirectory, "tsconfig.json");
        const tsconfigContent = await this.loadTsconfigContents();
        fileMap.set(tsconfigPath, tsconfigContent);
        // README
        const readmePath = filesystem_1.Path.FromSegments(this.projectRootDirectory, "README.md");
        const readmeContent = await this.loadReadmeContents();
        fileMap.set(readmePath, readmeContent);
        // ============================
        // src directory
        // ============================
        // <domain-name>.eventstore.ts
        const eventstorePath = filesystem_1.Path.FromSegments(this.projectSrcDirectory, `${this.formatter.fileNameCase(this.domainName)}.eventstore.ts`);
        const eventStoreContent = await this.loadEventStoreContents();
        fileMap.set(eventstorePath, eventStoreContent);
        // <domain-name>.api.ts
        const apiPath = filesystem_1.Path.FromSegments(this.projectSrcDirectory, `${this.formatter.fileNameCase(this.domainName)}.api.ts`);
        const apiContents = await this.loadApiContents();
        fileMap.set(apiPath, apiContents);
        return fileMap;
    }
    /**
     * validate()
     *
     * validates the current state. If the current state is valid, null is returned. If
     * the state is invalid, a string containing the error message should be returned.
     *
     */
    async validate() {
        let error = null;
        const directoryExists = await filesystem_1.FileSystem.Contains(this.projectRootDirectory);
        if (directoryExists) {
            error = `Dicrectory ${this.projectRootDirectory.toString()} already in use.`;
        }
        return error;
    }
    /**
     * exportsInfo()
     *
     * gets information about exports to add.
     */
    async exportsInfo() {
        return new Map();
    }
    // ====================================
    // helpers
    // ====================================
    /**
     * loadApiContents()
     *
     * loads the API content.
     * @returns the API content
     */
    async loadApiContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.API_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__DOMAIN_NAME__/g, this.formatter.classNameCase(this.domainName))
            .replace(/__DOMAIN_PATH__/g, this.formatter.fileNameCase(this.domainName));
    }
    /**
     * loadDomConfigContents()
     *
     * loads the domconfig.json content.
     * @returns loads the domconfig contents.
     */
    async loadDomConfigContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.DOMCONFIG_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__DOMAIN_NAME__/g, this.formatter.paramCase(this.domainName))
            .replace(/__DOMAIN_DESCRIPTION__/g, this.description)
            .replace(/__PACKAGE_MANAGER__/g, this.packageManager.toString());
    }
    /**
     * loadEcentStoreContents();
     *
     * loads the event store content.
     * @returns the contents of the event store.
     */
    async loadEventStoreContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.EVENTSTORE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        const className = this.formatter.classNameCase(this.domainName);
        return contents
            .replace(/__DOMAIN_NAME__/g, className);
    }
    /**
     * loadGitignoreContents()
     *
     * loads the gitignore contents
     * @returns the contents of the .gitignore file.
     */
    async loadGitignoreContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.GITIGNORE_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents;
    }
    /**
     * loadIndexContents()
     *
     * loads the index contents.
     * @returns the index file contents
     */
    async loadIndexContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.INDEX_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__DOMAIN_NAME__/g, this.formatter.fileNameCase(this.domainName));
    }
    /**
     * loadPackageJsonContents()
     *
     * loads the package.json file contents.
     * @returns the package.json file contents.
     */
    async loadPackageJsonContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.PACKAGE_JSON_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__DOMAIN_NAME__/g, this.formatter.domainNameCase(this.domainName))
            .replace(/__DOMAIN_DESCRIPTION__/g, this.description)
            .replace(/__DOMAIN_AUTHOR__/g, this.author)
            .replace(/__DOMAIN_REPOSITORY__/g, this.repository ? this.repository.toString() : "")
            .replace(/__DOMAIN_LICENSE__/g, this.license.toUpperCase());
    }
    /**
     * loadReadmeContents()
     *
     * loads the README contents.
     * @returns the README file contents
     */
    async loadReadmeContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.README_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__PROJECT_NAME__/g, this.formatter.fileNameCase(this.domainName))
            .replace(/__PROJECT_DESCRIPTION__/g, this.description);
    }
    /**
     * loadTsconfigContents()
     *
     * loads the tsconfig.json contents
     * @returns the contents of the tsconfig file.
     */
    async loadTsconfigContents() {
        const file = await filesystem_1.FileSystem.Open(ProjectArtifact.TSCONFIG_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents;
    }
}
exports.ProjectArtifact = ProjectArtifact;
// template paths
ProjectArtifact.INDEX_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "INDEX.template.txt");
ProjectArtifact.PACKAGE_JSON_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "PACKAGE_JSON.template.txt");
ProjectArtifact.DOMCONFIG_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "DOMCONFIG.template.txt");
ProjectArtifact.GITIGNORE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "GITIGNORE.template.txt");
ProjectArtifact.TSCONFIG_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "TSCONFIG.template.txt");
ProjectArtifact.EVENTSTORE_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "EVENTSTORE.template.txt");
ProjectArtifact.API_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "API.template.txt");
ProjectArtifact.README_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, 'templates', "README.template.txt");
//# sourceMappingURL=project.artifact.js.map