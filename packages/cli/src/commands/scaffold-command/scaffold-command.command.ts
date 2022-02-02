import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, CommandArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldCommandCommand
 * 
 * Scaffolds a Command in the project.
 */


export class ScaffoldCommandCommand extends Command {

    // paths
    static paths = [
        ["create", "command"]
    ];

    // parameters
    commandPath = Option.String({ required: true, name: 'command-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
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
            // create the command.
            this.context.stdout.write(messageFormatter.info(`Creating command\n`))
            spinner.start(messageFormatter.info("Writing command files..."));
            const moduleTemplate = new CommandArtifact(
                this.commandPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // command successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote command files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created Command\n`));
            return 0;
        }
        catch (e) {
            // failed to create the command
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create command files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}