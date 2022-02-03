"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaffoldModuleCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const os_1 = require("@swindle/os");
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("./../../utilities/utilities.well");
/**
 * ScaffoldModuleCommand
 *
 * Scaffolds a module in the project.
 */
class ScaffoldModuleCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.moduleName = clipanion_1.Option.String({ required: true, name: 'module-name', validator: t.isString() });
    }
    /**
     * execute()
     *
     * Executes the command.
     */
    async execute() {
        // create the module.
        const spinner = new utilities_well_1.Spinner();
        const cwd = os_1.Process.Cwd();
        const messageFormatter = new utilities_well_1.MessageFormatter();
        const stringFormatter = new artifact_builder_1.DomeniereStringFormatter();
        const builder = new artifact_builder_1.ArtifactBuilder();
        const printableModuleName = stringFormatter.classNameCase(this.moduleName);
        try {
            // create the module.
            this.context.stdout.write(messageFormatter.info(`Creating module ${printableModuleName}\n`));
            spinner.start(messageFormatter.info("Writing module files..."));
            const moduleTemplate = new artifact_builder_1.ModuleArtifact(this.moduleName, cwd);
            await builder.build(moduleTemplate);
            // module successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote module files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created module ${printableModuleName}\n`));
            return 0;
        }
        catch (e) {
            // failed to create the module.
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create module files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldModuleCommand = ScaffoldModuleCommand;
// paths
ScaffoldModuleCommand.paths = [
    ["create", "module"]
];
// This information is shown on the help command.
ScaffoldModuleCommand.usage = {
    category: 'Modules',
    description: "Creates a Module",
    details: "Creates a module in the current project directory.",
};
