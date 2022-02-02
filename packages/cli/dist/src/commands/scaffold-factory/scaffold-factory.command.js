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
exports.ScaffoldFactoryCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldFactoryCommand
 *
 * Scaffolds an factory in the project.
 */
class ScaffoldFactoryCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.factoryPath = clipanion_1.Option.String({ required: true, name: 'factory-path', validator: t.isString() });
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
            // create the aggregate.
            this.context.stdout.write(messageFormatter.info(`Creating factory\n`));
            spinner.start(messageFormatter.info("Writing factory files..."));
            const moduleTemplate = new artifact_builder_1.FactoryArtifact(this.factoryPath, cwd);
            await builder.build(moduleTemplate);
            // factory successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote factory files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created factory\n`));
            return 0;
        }
        catch (e) {
            // failed to create the factory
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create factory files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldFactoryCommand = ScaffoldFactoryCommand;
// paths
ScaffoldFactoryCommand.paths = [
    ["create", "factory"]
];
// This information is shown on the help command.
ScaffoldFactoryCommand.usage = {
    category: 'Modules',
    description: "Creates a Factory in the specified module.",
    details: `Creates a Factory in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "UserFactory" aggregate= in the "Users" module.',
    //         'domeniere create factory users/User'
    //     ],
    //     [
    //         'Creates a "PostFactory" aggregate inside the posts/ subdirectory of the "Users" module.',
    //         "domeniere create factory users/posts/Post"
    //     ]
    // ],  
};
