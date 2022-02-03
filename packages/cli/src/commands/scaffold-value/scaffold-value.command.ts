import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, ValueArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldEntityCommand
 * 
 * Scaffolds a entity in the project.
 */


export class ScaffoldValueCommand extends Command {

    // paths
    static paths = [
        ["create", "value"]
    ];

    // parameters
    valuePath = Option.String({ required: true, name: 'value-path', validator: t.isString() });
    identifier = Option.Boolean('--identifier', { description: 'Indicates whether the value will be used as an ID', required: false });

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates a Value in the specified module.",
        details: `Creates a value in the specified module.`,
        // This section is causing an error.
        // examples: [
        //     [
        //         'Creates a "UserId" value in the "Users" module.',
        //         'domeniere create value users/UserId'
        //     ],
        //     [
        //         'Creates a "PasswordReset" value inside the password/ subdirectory of the "Users" module.',
        //         "domeniere create value users/password/PasswordReset"
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
            // create the value.
            this.context.stdout.write(messageFormatter.info(`Creating value\n`))
            spinner.start(messageFormatter.info("Writing value files..."));
            const moduleTemplate = new ValueArtifact(
                this.valuePath,
                cwd,
                this.identifier,
            );
            await builder.build(moduleTemplate);

            // value successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote value files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created value\n`));
            return 0;
        }
        catch (e) {
            // failed to create the value.
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create value files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}