import { Path } from "@swindle/filesystem";
import { ModuleValidatorInterface } from "./module.validator.interface";
/**
 * ModuleValidator
 *
 * A module validator.
 */
export declare class ModuleValidator implements ModuleValidatorInterface {
    private readonly validModuleNamePattern;
    private readonly stringFormatter;
    constructor();
    /**
     * pathIsModule()
     *
     * determines if the path is a module.
     * @param path the path to test.
     * @param moduleName the name of the module.
     */
    pathIsModule(path: Path, moduleName: string): Promise<boolean>;
    /**
     * moduleNameIsValid()
     *
     * Determines if the module name is valid.
     */
    moduleNameIsValid(suspect: string): boolean;
}
//# sourceMappingURL=module.validator.d.ts.map