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
exports.ScaffoldEntityCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldEntityCommand
 *
 * Scaffolds an entity in the project.
 */
class ScaffoldEntityCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.entityPath = clipanion_1.Option.String({ required: true, name: 'entity-path', validator: t.isString() });
        this.timestamped = clipanion_1.Option.Boolean('--timestamped', { description: 'Indicates whether the entity will be timestamped', required: false });
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
            // create the entity.
            this.context.stdout.write(messageFormatter.info(`Creating entity\n`));
            spinner.start(messageFormatter.info("Writing entity files..."));
            const moduleTemplate = new artifact_builder_1.EntityArtifact(this.entityPath, cwd, this.timestamped);
            await builder.build(moduleTemplate);
            // entity successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote entity files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created entity\n`));
            return 0;
        }
        catch (e) {
            // failed to create the entity.
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create entity files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldEntityCommand = ScaffoldEntityCommand;
// paths
ScaffoldEntityCommand.paths = [
    ["create", "entity"]
];
// This information is shown on the help command.
ScaffoldEntityCommand.usage = {
    category: 'Modules',
    description: "Creates an Entity in the specified module.",
    details: `Creates an Entity in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "UserProfile" entity in the "Users" module.',
    //         'domeniere create entity users/UserProfile'
    //     ],
    //     [
    //         'Creates a "PostMetadata" entity inside the posts/metadata/ subdirectory of the "Users" module.',
    //         "domeniere create entity users/posts/metadata/PostMetadata"
    //     ]
    // ],  
};
