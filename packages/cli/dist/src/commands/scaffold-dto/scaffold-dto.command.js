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
exports.ScaffoldDtoCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldDtoCommand
 *
 * Scaffolds a Dto in the project.
 */
class ScaffoldDtoCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.dtoPath = clipanion_1.Option.String({ required: true, name: 'dto-path', validator: t.isString() });
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
            // create the dto.
            this.context.stdout.write(messageFormatter.info(`Creating dto\n`));
            spinner.start(messageFormatter.info("Writing dto files..."));
            const moduleTemplate = new artifact_builder_1.DtoArtifact(this.dtoPath, cwd);
            await builder.build(moduleTemplate);
            // dto successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote dto files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created dto\n`));
            return 0;
        }
        catch (e) {
            // failed to create the dto
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create dto files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldDtoCommand = ScaffoldDtoCommand;
// paths
ScaffoldDtoCommand.paths = [
    ["create", "dto"]
];
// This information is shown on the help command.
ScaffoldDtoCommand.usage = {
    category: 'Modules',
    description: "Creates a Dto in the specified module.",
    details: `Creates a Dto in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "User" Dto in the "Users" module.',
    //         'domeniere create dto users/User'
    //     ],
    //     [
    //         'Creates a "AccountProfile" Dto inside the accounts/ subdirectory of the "Users" module.',
    //         "domeniere create dto users/accounts/AccountProfile"
    //     ]
    // ],  
};
