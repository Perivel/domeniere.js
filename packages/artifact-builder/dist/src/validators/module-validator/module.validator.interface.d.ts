import { Path } from "@swindle/filesystem";
export interface ModuleValidatorInterface {
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
//# sourceMappingURL=module.validator.interface.d.ts.map