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
exports.ScaffoldEventCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const artifact_builder_1 = require("@domeniere/artifact-builder");
const utilities_well_1 = require("../../utilities/utilities.well");
const os_1 = require("@swindle/os");
/**
 * ScaffoldEventCommand
 *
 * Scaffolds an event in the project.
 */
class ScaffoldEventCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.eventPath = clipanion_1.Option.String({ required: true, name: 'event-path', validator: t.isString() });
        this.errorEvent = clipanion_1.Option.Boolean("--error-event", { required: false, description: "indicates the event is an error event." });
        this.noBroadcst = clipanion_1.Option.Boolean("--no-broadcast", { required: false, description: "indicates the event should not be broadcasted" });
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
            // create the event.
            this.context.stdout.write(messageFormatter.info(`Creating event\n`));
            spinner.start(messageFormatter.info("Writing event files..."));
            const moduleTemplate = new artifact_builder_1.EventArtifact(this.eventPath, cwd, !this.noBroadcst, this.errorEvent);
            await builder.build(moduleTemplate);
            // event successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote event files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created event\n`));
            return 0;
        }
        catch (e) {
            // failed to create the event
            const errorMessage = e.message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create event files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}
exports.ScaffoldEventCommand = ScaffoldEventCommand;
// paths
ScaffoldEventCommand.paths = [
    ["create", "event"]
];
// This information is shown on the help command.
ScaffoldEventCommand.usage = {
    category: 'Modules',
    description: "Creates an Event in the specified module.",
    details: `Creates aa Event in the specified module.`,
    // This section is causing an error.
    // examples: [
    //     [
    //         'Creates a "UserCreated" event in the "Users" module.',
    //         'domeniere create event users/UsersCreated'
    //     ],
    //     [
    //         'Creates a "UserLoginFailed" error event inside the auth/ subdirectory of the "Users" module.',
    //         "domeniere create auth users/auth/UserLoginFailed --error-event"
    //     ]
    // ],  
};
