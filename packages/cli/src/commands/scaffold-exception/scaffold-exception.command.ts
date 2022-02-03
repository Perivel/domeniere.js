import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, ExceptionArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldExceptionCommand
 * 
 * Scaffolds an exception in the project.
 */


export class ScaffoldExceptionCommand extends Command {

    // paths
    static paths = [
        ["create", "exception"]
    ];

    // parameters
    exceptionPath = Option.String({ required: true, name: 'exception-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates an Exception in the specified module.",
        details: `Creates aa Exception in the specified module.`,
        // This section is causing an error.
        // examples: [
        //     [
        //         'Creates a "InvalidIdException" exception in the "Users" module.',
        //         'domeniere create exception users/InvalidId'
        //     ],
        //     [
        //         'Creates a "InvalidUsername" exception inside the users/ subdirectory of the "Users" module.',
        //         "domeniere create exception users/user/InvalidUsername"
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
            // create the exception.
            this.context.stdout.write(messageFormatter.info(`Creating exception\n`))
            spinner.start(messageFormatter.info("Writing exception files..."));
            const moduleTemplate = new ExceptionArtifact(
                this.exceptionPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // exception successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote exception files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created exception\n`));
            return 0;
        }
        catch (e) {
            // failed to create the exception
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create exception files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}