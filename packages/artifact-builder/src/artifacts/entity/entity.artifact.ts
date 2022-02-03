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
 * EntityArtifact
 * 
 * An artifact for constructing an entity.
 */

export class EntityArtifact extends Artifact {

    // templates
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");
    private static INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "INTERFACE.template.txt");
    private static ENTITY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "ENTITY.template.txt");
    private static TIMESTAMPED_ENTITY_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "TIMESTAMPED_ENTITY.template.txt");

    // data
    private readonly projectRoot: Path;
    private readonly details: ArtifactDetails;
    private readonly isTimestamped: boolean;

    // domconfig path
    private readonly domconfigPath: Path;

    // the path to the module root directory.
    private readonly modulePath: Path;

    // the path to the module file.
    private readonly moduleFilePath: Path;

    // the entities directory for the module.
    private readonly moduleEntitiesDirPath: Path;

    // the entities well file path for the module.
    private readonly moduleEntitiesWellFilePath: Path;

    // the directory of the entity to create.
    private readonly entityPath: Path;

    // utilities.
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly moduleValidator: ModuleValidatorInterface;

    constructor(
        details: string,
        projectRoot: Path,
        isTimestamped: boolean = false
    ) {
        super();
        // utilities
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.moduleValidator = new ModuleValidator();

        // data
        this.projectRoot = projectRoot;
        this.isTimestamped = isTimestamped;
        this.details = this.inputParser.parse(details);
        this.domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleFilePath = Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`);
        this.moduleEntitiesDirPath = Path.FromSegments(this.modulePath, "entities");
        this.moduleEntitiesWellFilePath = Path.FromSegments(this.moduleEntitiesDirPath, "entities.well.ts");
        this.entityPath = Path.FromSegments(this.moduleEntitiesDirPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));

    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.entityPath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap = new Map<Path, string>();

        // well file.
        if (!await FileSystem.Contains(this.moduleEntitiesWellFilePath)) {
            const entitiesWellFileContent = await this.loadWellContents();
            filesMap.set(this.moduleEntitiesWellFilePath, entitiesWellFileContent);
        }

        // interfaces and classes.
        const interfaceFilePath = Path.FromSegments(this.entityPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        const classFilePath = Path.FromSegments(this.entityPath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
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

    public async exportsInfo(): Promise<Map<Path, string>> {
        const exports = new Map<Path, string>();

        // export well file to module file.
        exports.set(this.moduleFilePath, `\nexport * from "./entities/entities.well";`);

        // export entity files to entities well file.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}";`;
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

            // make sure the entity does not already exist.
            if (await FileSystem.Contains(this.entityPath)) {
                throw new Error(`Entity '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
            }

            return null;
        }
        catch(e) {
            return (e as Error).message;
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

    public async loadEntityContents(): Promise<string> {
        const file = await FileSystem.Open(EntityArtifact.ENTITY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    public async loadInterfaceContents(): Promise<string> {
        const file = await FileSystem.Open(EntityArtifact.INTERFACE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    public async loadTimestampedEntityContents(): Promise<string> {
        const file = await FileSystem.Open(EntityArtifact.TIMESTAMPED_ENTITY_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
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

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(EntityArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "entities");
    }
}