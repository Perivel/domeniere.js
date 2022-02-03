import { FileOpenFlag, FileOpenMode, FileSystem, Path } from "@swindle/filesystem";
import { DomeniereStringFormatter } from "../../formatters/domeniere-string-formatter/domeniere-string.formatter";
import { Artifact } from "../../artifact/artifact";
import { PackageManager } from "../../constants/constants.well";

/**
 * ProjectArtifact
 * 
 * A Project artifact.
 * 
 * An artifact representing a Domeniere Project.
 */

export class ProjectArtifact extends Artifact {

    // template paths
    private static INDEX_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "INDEX.template.txt");
    private static PACKAGE_JSON_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "PACKAGE_JSON.template.txt");
    private static DOMCONFIG_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "DOMCONFIG.template.txt");
    private static GITIGNORE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "GITIGNORE.template.txt");
    private static TSCONFIG_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "TSCONFIG.template.txt");
    private static EVENTSTORE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "EVENTSTORE.template.txt");
    private static API_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "API.template.txt");
    private static README_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "README.template.txt");

    private readonly domainName: string;
    private readonly description: string;
    private readonly author: string;
    private readonly repository: URL|null;
    private readonly license: string;
    private readonly packageManager: PackageManager;
    private readonly targetDir: Path;

    private readonly formatter: DomeniereStringFormatter;
    private readonly projectRootDirectory: Path;
    private readonly projectSrcDirectory: Path;

    constructor(
        domainName: string,
        description: string,
        author: string,
        repositoryUrl: URL|null,
        license: string,
        packageManager: PackageManager,
        targetDir: Path,
    ) {
        super();
        this.domainName = domainName;
        this.description = description;
        this.author = author;
        this.repository = repositoryUrl;
        this.license = license;
        this.packageManager = packageManager;
        this.targetDir = targetDir;

        this.formatter = new DomeniereStringFormatter();
        this.projectRootDirectory = Path.FromSegments(this.targetDir, this.formatter.domainNameCase(this.domainName));
        this.projectSrcDirectory = Path.FromSegments(this.projectRootDirectory, "src");
    }

    /**
     * directory()
     * 
     * The directory where the artifacts will be contained.
     */

    public directoriesInfo(): Path[] {
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

    public async filesInfo(): Promise<Map<Path, string>> {
        
        const fileMap = new Map<Path, string>();

        // =========================
        //  root directory
        // =========================

        // index
        const indexPath = Path.FromSegments(this.projectRootDirectory, `index.ts`);
        const indexContents = await this.loadIndexContents();
        fileMap.set(indexPath, indexContents);

        // package.json
        const packageJsonPath = Path.FromSegments(this.projectRootDirectory, "package.json");
        const packageJsonContents = await this.loadPackageJsonContents();
        fileMap.set(packageJsonPath, packageJsonContents);

        // domconfig
        const domconfigPath = Path.FromSegments(this.projectRootDirectory, "domconfig.json");
        const domconfigContent = await this.loadDomConfigContents();
        fileMap.set(domconfigPath, domconfigContent);

        // gitignore
        const gitignorePath = Path.FromSegments(this.projectRootDirectory, ".gitignore");
        const gitignoreContent = await this.loadGitignoreContents();
        fileMap.set(gitignorePath, gitignoreContent);

        // tsconfig.json
        const tsconfigPath = Path.FromSegments(this.projectRootDirectory, "tsconfig.json");
        const tsconfigContent = await this.loadTsconfigContents();
        fileMap.set(tsconfigPath, tsconfigContent);

        // README
        const readmePath = Path.FromSegments(this.projectRootDirectory, "README.md");
        const readmeContent = await this.loadReadmeContents();
        fileMap.set(readmePath, readmeContent);


        // ============================
        // src directory
        // ============================

        // <domain-name>.eventstore.ts
        const eventstorePath = Path.FromSegments(this.projectSrcDirectory, `${this.formatter.fileNameCase(this.domainName)}.eventstore.ts`);
        const eventStoreContent = await this.loadEventStoreContents();
        fileMap.set(eventstorePath, eventStoreContent);

        // <domain-name>.api.ts
        const apiPath = Path.FromSegments(this.projectSrcDirectory, `${this.formatter.fileNameCase(this.domainName)}.api.ts`);
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

    public async validate(): Promise<string | null> {
        let error: string|null = null;
        const directoryExists = await FileSystem.Contains(this.projectRootDirectory);
        
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

    public async exportsInfo(): Promise<Map<Path, string>> {
        return new Map<Path, string>();
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

    private async loadApiContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.API_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadDomConfigContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.DOMCONFIG_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadEventStoreContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.EVENTSTORE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadGitignoreContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.GITIGNORE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadIndexContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.INDEX_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadPackageJsonContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.PACKAGE_JSON_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadReadmeContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.README_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadTsconfigContents(): Promise<string> {
        const file = await FileSystem.Open(ProjectArtifact.TSCONFIG_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents;
    }
}