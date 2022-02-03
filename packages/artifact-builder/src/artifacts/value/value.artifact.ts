import { FileOpenFlag, FileOpenMode, FileSystem, Path } from "@swindle/filesystem";
import { ModuleValidator } from "../../validators/validators.well";
import { Artifact } from "./../../artifact/artifact";
import { ArtifactDetailsParser, ArtifactDetails } from "./../../artifact-details-parser/artifact-details-parrser.well";
import { DomeniereStringFormatter } from "../../formatters/formatters.well";

/**
 * ValuesArtifact
 * 
 * The values artifact.
 */

export class ValueArtifact extends Artifact {

    private static INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "INTERFACE.template.txt");
    private static IDENTIFIER_INTERFACE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "IDENTIFIER_INTERFACE.template.txt");
    private static VALUE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "VALUE.template.txt");
    private static IDENTIFIER_VALUE_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "IDENTIFIER_VALUE.template.txt");
    private static WELL_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, 'templates', "WELL.template.txt");

    private details: ArtifactDetails;
    private readonly projectRoot: Path;
    private readonly inputParser: ArtifactDetailsParser;
    private readonly stringFormatter: DomeniereStringFormatter;
    private readonly moduleValidator: ModuleValidator;
    private readonly valuePath: Path;
    private readonly modulePath: Path;
    private readonly moduleValuesPath: Path;
    private readonly isIdentifier: boolean
    private readonly moduleValuesWellFilePath: Path;
    private readonly valueInterfacePath: Path;
    private readonly valueClassPath: Path;

    constructor(
        input: string,
        projectRoot: Path,
        isIdentifier: boolean = false
    ) {
        super();
        this.isIdentifier = isIdentifier;
        this.moduleValidator = new ModuleValidator();
        this.inputParser = new ArtifactDetailsParser();
        this.stringFormatter = new DomeniereStringFormatter();
        this.details = this.inputParser.parse(input);
        this.projectRoot = projectRoot;
        this.modulePath = Path.FromSegments(this.projectRoot, "src", this.stringFormatter.fileNameCase(this.details.module()));
        this.moduleValuesPath = Path.FromSegments(this.modulePath, "values");
        this.moduleValuesWellFilePath = Path.FromSegments(this.moduleValuesPath, "values.well.ts");
        this.valuePath = Path.FromSegments(this.moduleValuesPath, this.details.artifactDirPath(), this.stringFormatter.fileNameCase(this.details.artifactName()));
        this.valueInterfacePath = Path.FromSegments(this.valuePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.interface.ts`);
        this.valueClassPath = Path.FromSegments(this.valuePath, `${this.stringFormatter.fileNameCase(this.details.artifactName())}.ts`);
    }

    /**
     * directoriesInfo()
     *
     * The directories to be created for the artifact.
     */


    public directoriesInfo(): Path[] {
        return [this.valuePath];
    }

    /**
     * filesInfo()
     * 
     * gets the information related to the files to be created for the artifact.
     */

    public async filesInfo(): Promise<Map<Path, string>> {
        const filesMap =  new Map<Path, string>();

        // well file if it does not already exist.
        if (!await FileSystem.Contains(this.moduleValuesWellFilePath)) {
            const wellContents = await this.loadWellContents();
            filesMap.set(this.moduleValuesWellFilePath, wellContents);
        }

        // load interface and class contents.
        let interfaceContents = "";
        let classContents = "";

        if (this.isIdentifier) {
            // load identifier contents.
            interfaceContents = await this.loadIdentifierInterfaceContents();
            classContents = await this.loadIdentifierClassContents();
            
        }
        else {
            // load regular contents.
            interfaceContents = await this.loadInterfaceContents();
            classContents = await this.loadClassContents();
        }

        filesMap.set(this.valueInterfacePath, interfaceContents);
        filesMap.set(this.valueClassPath, classContents);

        return filesMap;
    }

    /**
     * exportsInfo()
     * 
     * gets information about exports to add.
     */

    public async exportsInfo(): Promise<Map<Path, string>> {
        const exports = new Map<Path, string>();

        // well file.
        exports.set(Path.FromSegments(this.modulePath, `${this.stringFormatter.fileNameCase(this.details.module())}.module.ts`), `\nexport * from "./values/values.well";`)

        // add the value exports.
        const interfaceContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName())}.interface";`;
        const classContent = `\nexport * from "./${this.details.artifactDirPath() ? this.details.artifactDirPath() + Path.Separator() : ""}${this.stringFormatter.fileNameCase(this.details.artifactName()) + Path.Separator() + this.stringFormatter.fileNameCase(this.details.artifactName()) }";`;
        const content = interfaceContent.concat(classContent);
        exports.set(this.moduleValuesWellFilePath, content);

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
            // make sure we are in a domeniere project.
            const domconfigPath = Path.FromSegments(this.projectRoot, "domconfig.json");

            if (!await FileSystem.Contains(domconfigPath)) {
                throw new Error("Not a Domeniere project.");
            }

            // make sure the module exists.
            if (!await this.moduleValidator.pathIsModule(this.modulePath, this.stringFormatter.fileNameCase(this.details.module()))) {
                throw new Error(`Module '${this.stringFormatter.classNameCase(this.details.module())}' does not exist.`);
            }

            // make sure the value does not already exist.
            if (await FileSystem.Contains(this.valuePath)) {
                throw new Error(`Value '${this.stringFormatter.classNameCase(this.details.artifactName())}' already exists.`);
            }

            // all valid
            return null;
        }
        catch(e) {
            return (e as Error).message;
        }
    }

    // ====================================
    // helpers
    // ====================================

    /**
     * loadClassContents()
     * 
     * loads the contents for a regular value class.
     * @returns the contents for the value class
     */

    private async loadClassContents(): Promise<string> {
        const file = await FileSystem.Open(ValueArtifact.VALUE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content
            .replace(/__VALUE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__VALUE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()));
    }

    /**
     * loadIdentifierClassContents()
     * 
     * loads the contents for an identifier value class.
     * @returns the contents for the value class
     */

    private async loadIdentifierClassContents(): Promise<string> {
        const file = await FileSystem.Open(ValueArtifact.IDENTIFIER_VALUE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content
            .replace(/__VALUE_NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()))
            .replace(/__VALUE_PATH__/g, this.stringFormatter.fileNameCase(this.details.artifactName()));
    }

    /**
     * loadIdentifierInterfaceContents()
     * 
     * loads the contents for an identifer interface.
     * @returns the contents for the value interface.
     */

    private async loadIdentifierInterfaceContents(): Promise<string> {
        const file = await FileSystem.Open(ValueArtifact.IDENTIFIER_INTERFACE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadInterfaceContents()
     * 
     * loads the contents for a regular interface.
     * @returns the contents for the value interface.
     */

    private async loadInterfaceContents(): Promise<string> {
        const file = await FileSystem.Open(ValueArtifact.INTERFACE_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__NAME__/g, this.stringFormatter.classNameCase(this.details.artifactName()));
    }

    /**
     * loadWellContents()
     * 
     * loads the contents for a values well file..
     * @returns the contents for the values well file.
     */

    private async loadWellContents(): Promise<string> {
        const file = await FileSystem.Open(ValueArtifact.WELL_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
        const content = await file.readAll();
        await file.close();
        return content.replace(/__WELL_TYPE__/g, "values");
    }
}