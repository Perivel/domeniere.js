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
exports.ScaffoldAggregateCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldAggregateCommand
 *
 * Scaffolds an aggregate in the project.
 */
class ScaffoldAggregateCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.aggregatePath = clipanion_1.Option.String({ required: true, name: 'aggregate-path', validator: t.isString() });
        this.timestamped = clipanion_1.Option.Boolean('--timestamped', { description: 'Indicates whether the aggregate will be timestamped', required: false });
    }
    /**
     * execute()
     *
     * Executes the command.
     */
    async execute() {
        // create the aggregate
        const spinner = new utilities_well_1.Spinner();
        const cwd = os_1.Process.Cwd();
        const messageFormatter = new utilities_well_1.MessageFormatter();
        const stringFormatter = new artifact_builder_1.DomeniereStringFormatter();
        const builder = new artifact_builder_1.ArtifactBuilder();
        try {
            // create the aggregate.
            this.context.stdout.write(messageFormatter.info(`Creating aggregate\n`));
            spinner.start(messageFormatter.info("Writing aggregate files..."));
            const moduleTemplate = new artifact_builder_1.AggregateArtifact(this.aggregatePath, cwd, this.timestamped);
            await builder.build(moduleTemplate);
            // aggregate successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote aggregate files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created aggregate\n`));
            return 0;
        }
        catch (e) {
            // failed to create the aggregate.
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create aggregate files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldAggregateCommand = ScaffoldAggregateCommand;
// paths
ScaffoldAggregateCommand.paths = [
    ["create", "aggregate"]
];
// This information is shown on the help command.
ScaffoldAggregateCommand.usage = {
    category: 'Modules',
    description: "Creates an Aggregate in the specified module.",
    details: `Creates an Aggregate in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "UserAccount" aggregate in the "Users" module.',
    //         'domeniere create aggregate users/UserAccount'
    //     ],
    //     [
    //         'Creates a "Post" aggregate inside the posts/ subdirectory of the "Users" module.',
    //         "domeniere create aggregate users/posts/Post"
    //     ]
    // ],  
};
