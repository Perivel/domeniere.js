import { FileSystem, Path } from "@swindle/filesystem";
import { DomeniereStringFormatter } from "../../formatters/formatters.well";
import { ModuleValidatorInterface } from "./module.validator.interface";

/**
 * ModuleValidator
 * 
 * A module validator.
 */

export class ModuleValidator implements ModuleValidatorInterface {

    private readonly validModuleNamePattern: RegExp;
    private readonly stringFormatter: DomeniereStringFormatter;

    constructor() {
        this.validModuleNamePattern = /^[\w-_]*$/;
        this.stringFormatter = new DomeniereStringFormatter();
    }

    /**
     * pathIsModule()
     * 
     * determines if the path is a module.
     * @param path the path to test.
     * @param moduleName the name of the module.
     */

    public async pathIsModule(path: Path, moduleName: string): Promise<boolean> {
        const pathToTest = Path.FromSegments(path, `${this.stringFormatter.fileNameCase(moduleName)}.module.ts`);
        return await FileSystem.Contains(pathToTest);
    }

    /**
     * moduleNameIsValid()
     * 
     * Determines if the module name is valid.
     */

    public moduleNameIsValid(suspect: string): boolean {
        return this.validModuleNamePattern.test(suspect);
    }
}