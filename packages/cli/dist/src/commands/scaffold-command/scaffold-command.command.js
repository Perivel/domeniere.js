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
exports.ScaffoldCommandCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldCommandCommand
 *
 * Scaffolds a Command in the project.
 */
class ScaffoldCommandCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.commandPath = clipanion_1.Option.String({ required: true, name: 'command-path', validator: t.isString() });
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
        try {
            // create the command.
            this.context.stdout.write(messageFormatter.info(`Creating command\n`));
            spinner.start(messageFormatter.info("Writing command files..."));
            const moduleTemplate = new artifact_builder_1.CommandArtifact(this.commandPath, cwd);
            await builder.build(moduleTemplate);
            // command successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote command files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created Command\n`));
            return 0;
        }
        catch (e) {
            // failed to create the command
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create command files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldCommandCommand = ScaffoldCommandCommand;
// paths
ScaffoldCommandCommand.paths = [
    ["create", "command"]
];
// This information is shown on the help command.
ScaffoldCommandCommand.usage = {
    category: 'Modules',
    description: "Creates a Command in the specified module.",
    details: `Creates a Command in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "CreateUser" command in the "Users" module.',
    //         'domeniere create command users/CreateUser'
    //     ],
    //     [
    //         'Creates a "VerifyUser" Specification inside the verification/ subdirectory of the "Users" module.',
    //         "domeniere create command users/verification/VerifyUser"
    //     ]
    // ],  
};
