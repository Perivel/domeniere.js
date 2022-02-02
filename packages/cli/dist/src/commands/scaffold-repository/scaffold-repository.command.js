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
exports.ScaffoldRepositoryCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldRepositoryCommand
 *
 * Scaffolds an repository in the project.
 */
class ScaffoldRepositoryCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.repositoryPath = clipanion_1.Option.String({ required: true, name: 'repository-path', validator: t.isString() });
        this.isIdentityGenerating = clipanion_1.Option.Boolean("--generates-identity", { required: false, description: "indicates whether the repository should generate identity." });
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
            this.context.stdout.write(messageFormatter.info(`Creating repository\n`));
            spinner.start(messageFormatter.info("Writing repository files..."));
            const moduleTemplate = new artifact_builder_1.RepositoryArtifact(this.repositoryPath, cwd, this.isIdentityGenerating);
            await builder.build(moduleTemplate);
            // repository successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote repository files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created repository\n`));
            return 0;
        }
        catch (e) {
            // failed to create the repository
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create repository files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldRepositoryCommand = ScaffoldRepositoryCommand;
// paths
ScaffoldRepositoryCommand.paths = [
    ["create", "repository"]
];
// This information is shown on the help command.
ScaffoldRepositoryCommand.usage = {
    category: 'Modules',
    description: "Creates a repository in the specified module.",
    details: `Creates a Repository in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "UserRepository" repository in the "Users" module.',
    //         'domeniere create repository users/User'
    //     ],
    //     [
    //         'Creates a "PostRepository" repository inside the posts/ subdirectory of the "Users" module.',
    //         "domeniere create repository users/posts/Post"
    //     ]
    // ],  
};
