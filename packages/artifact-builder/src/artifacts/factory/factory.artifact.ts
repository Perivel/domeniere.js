import {
    File,
    FileOpenFlag,
    FileOpenMode,
    FileSystem,
    Path,
} from "@swindle/filesystem";
import { Artifact } from "./../../artifact/artifact";
import {
    ArtifactDetails,
    ArtifactDetailsParser,
} from "./../../artifact-details-parser/artifact-details-parrser.well";
import { DomeniereStringFormatter } from "./../../formatters/formatters.well";
import { ModuleValidator } from "./../../validators/validators.well";
import { ModuleValidatorInterface } from "../../validators/module-validator/module.validator.interface";

/**
 * FactoryArtifact
 * 
 * An artifact for constructing a factory.
 */

export class FactoryArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "FACTORY_INTERFACE.template.txt");
    private static FACTORY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "FACTORY.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the factories directory for the module.
    private readonly moduleFactoriesDirPath: Path;

    // the factories well file path for the module.
    private readonly moduleFactoriesWellFilePath: Path;

    // the directory of the factory to create.
    private readonly factoryPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleFactoriesDirPath = Path.FromSegments(this.modulePath, "factories");
        this.moduleFactoriesWellFilePath = Path.FromSegments(this.moduleFactoriesDirPath, "factories.well.ts");
        this.factoryPath = Path.FromSegments(this.moduleFactoriesDirPath, this.details.artifactDirPath(), `${this.stringFormatter.fileNameCase(this.details.artifactName())}-factory`);

    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.factoryPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleFactoriesWellFilePath)) {
            const factoriesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleFactoriesWellFilePath, factoriesWellFileContent);
        }

        // interfaces and classes.
        const interfaceFilePath = Path.FromSegments(this.factoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}-factory.interface.ts`);
        const classFilePath = Path.FromSegments(this.factoryPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.factory.ts`);
        const interfaceContents = await this.loadInterfaceContents();
        let classContent = await this.loadFactoryContents();

        filesMap.set(interfaceFilePath, interfaceContents);
        filesMap.set(classFilePath, classContent);

        return filesMap;
    }

    /**
     * exportsInfo()
     * 
     * gets information about exports to add.
     */

    public async exportsInfo(): Promise<Map<Path, string>> {
        const exports = new Map<Path, string>();

        // export well file to module file.
        exports.set(this.moduleFilePath, `\nexport * from "./factories/factories.well";`);

        // export factories files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName() + "-factory") + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}-factory.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName() + "-factory") + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.factory";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleFactoriesWellFilePath, content);

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

    public async validate(): Promise<string | null> {

        try {
            // make sure we are in a Domeniere project
            if (!await FileSystem.Contains(this.domconfigPath)) {
                throw new Error("Not a Domeniere Project");
            }

            // make sure the module exists.
            if (!await this.moduleValidator.pathIsModule(this.modulePath, this.stringFormatter.fileNameCase(this.details.module()))) {
                throw new Error(`Module '${this.stringFormatter.classNameCase(this.details.module())}' does not exist.`);
            }

            // make sure the factory does not already exist.
            if (await FileSystem.Contains(this.factoryPath)) {
                throw new Error(`Factory '${this.stringFormatter.classNameCase(this.details.artifactName())}Factory' already exists.`);
            }

            return null;
        }
        catch (e) {
            return (e as Error).message;
        }
    }

    // ================================
    // helpers
    // ================================

    /**
     * loadFactoryContents()
     * 
     * loads the factory contents.
     * @returns the factory class contents.
     */

    public async loadFactoryContents(): Promise<string> {
        const file = await FileSystem.Open(FactoryArtifact.FACTORY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await file.readAll();
        await file.close();
        return contents
            .replace(/__FACTORY_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()))
            .replace(/__FACTORY_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadInterfaceContents()
     * 
     * loads the interface contents.
     * @returns the interface contents.
     */

    public async loadInterfaceContents(): Promise<string> {
        const file = await FileSystem.Open(FactoryArtifact.INTERFACE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const contents = await (await file).readAll();
        await file.close();
        return contents.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(FactoryArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "factories");
    }
}