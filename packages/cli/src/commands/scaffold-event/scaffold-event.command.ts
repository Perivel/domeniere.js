import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, EventArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldEventCommand
 * 
 * Scaffolds an event in the project.
 */


export class ScaffoldEventCommand extends Command {

    // paths
    static paths = [
        ["create", "event"]
    ];

    // parameters
    eventPath = Option.String({ required: true, name: 'event-path', validator: t.isString() });
    errorEvent = Option.Boolean("--error-event", { required: false, description: "indicates the event is an error event." })
    noBroadcst = Option.Boolean("--no-broadcast", { required: false, description: "indicates the event should not be broadcasted" })

    // This information is shown on the help command.
    static usage = {
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

    /**
     * execute()
     * 
     * Executes the command.
     */

    async execute(): Promise<number> {

        // create the module.
        const spinner = new Spinner();
        const cwd = Process.Cwd();
        const messageFormatter = new MessageFormatter();
        const stringFormatter = new DomeniereStringFormatter();
        const builder = new ArtifactBuilder();

        try {
            // create the event.
            this.context.stdout.write(messageFormatter.info(`Creating event\n`))
            spinner.start(messageFormatter.info("Writing event files..."));
            const moduleTemplate = new EventArtifact(
                this.eventPath,
                cwd,
                !this.noBroadcst,
                this.errorEvent
            );
            await builder.build(moduleTemplate);

            // event successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote event files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created event\n`));
            return 0;
        }
        catch (e) {
            // failed to create the event
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create event files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}