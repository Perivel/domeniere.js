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
exports.ScaffoldQueryCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldQueryCommand
 *
 * Scaffolds a Query in the project.
 */
class ScaffoldQueryCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.queryPath = clipanion_1.Option.String({ required: true, name: 'query-path', validator: t.isString() });
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
            // create the query.
            this.context.stdout.write(messageFormatter.info(`Creating query\n`));
            spinner.start(messageFormatter.info("Writing query files..."));
            const moduleTemplate = new artifact_builder_1.QueryArtifact(this.queryPath, cwd);
            await builder.build(moduleTemplate);
            // query successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote query files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created Query\n`));
            return 0;
        }
        catch (e) {
            // failed to create the query
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create query files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldQueryCommand = ScaffoldQueryCommand;
// paths
ScaffoldQueryCommand.paths = [
    ["create", "query"]
];
// This information is shown on the help command.
ScaffoldQueryCommand.usage = {
    category: 'Modules',
    description: "Creates a Query in the specified module.",
    details: `Creates a Query in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "GetUserById" query in the "Users" module.',
    //         'domeniere create query users/GetUserById'
    //     ],
    //     [
    //         'Creates a "GetPostsForUser" query inside the posts/ subdirectory of the "Users" module.',
    //         "domeniere create query users/posts/GetPostsForUser"
    //     ]
    // ],  
};
