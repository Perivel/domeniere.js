import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, FactoryArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldFactoryCommand
 * 
 * Scaffolds an factory in the project.
 */


export class ScaffoldFactoryCommand extends Command {

    // paths
    static paths = [
        ["create", "factory"]
    ];

    // parameters
    factoryPath = Option.String({ required: true, name: 'factory-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
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
            // create the aggregate.
            this.context.stdout.write(messageFormatter.info(`Creating factory\n`))
            spinner.start(messageFormatter.info("Writing factory files..."));
            const moduleTemplate = new FactoryArtifact(
                this.factoryPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // factory successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote factory files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created factory\n`));
            return 0;
        }
        catch (e) {
            // failed to create the factory
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create factory files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}