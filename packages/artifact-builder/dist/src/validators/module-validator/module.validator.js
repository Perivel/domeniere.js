"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleValidator = void 0;
const filesystem_1 = require("@swindle/filesystem");
const formatters_well_1 = require("../../formatters/formatters.well");
/**
 * ModuleValidator
 *
 * A module validator.
 */
class ModuleValidator {
    constructor() {
        this.validModuleNamePattern = /^[\w-_]*$/;
        this.stringFormatter = new formatters_well_1.DomeniereStringFormatter();
    }
    /**
     * pathIsModule()
     *
     * determines if the path is a module.
     * @param path the path to test.
     * @param moduleName the name of the module.
     */
    async pathIsModule(path, moduleName) {
        const pathToTest = filesystem_1.Path.FromSegments(path, `${this.stringFormatter.fileNameCase(moduleName)}.module.ts`);
        return await filesystem_1.FileSystem.Contains(pathToTest);
    }
    /**
     * moduleNameIsValid()
     *
     * Determines if the module name is valid.
     */
    moduleNameIsValid(suspect) {
        return this.validModuleNamePattern.test(suspect);
    }
}
exports.ModuleValidator = ModuleValidator;
//# sourceMappingURL=module.validator.js.map