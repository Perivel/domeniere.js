import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, AggregateArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldAggregateCommand
 * 
 * Scaffolds an aggregate in the project.
 */


export class ScaffoldAggregateCommand extends Command {

    // paths
    static paths = [
        ["create", "aggregate"]
    ];

    // parameters
    aggregatePath = Option.String({ required: true, name: 'aggregate-path', validator: t.isString() });
    timestamped = Option.Boolean('--timestamped', { description: 'Indicates whether the aggregate will be timestamped', required: false });

    // This information is shown on the help command.
    static usage = {
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

    /**
     * execute()
     * 
     * Executes the command.
     */

    async execute(): Promise<number> {

        // create the aggregate
        const spinner = new Spinner();
        const cwd = Process.Cwd();
        const messageFormatter = new MessageFormatter();
        const stringFormatter = new DomeniereStringFormatter();
        const builder = new ArtifactBuilder();

        try {
            // create the aggregate.
            this.context.stdout.write(messageFormatter.info(`Creating aggregate\n`))
            spinner.start(messageFormatter.info("Writing aggregate files..."));
            const moduleTemplate = new AggregateArtifact(
                this.aggregatePath,
                cwd,
                this.timestamped,
            );
            await builder.build(moduleTemplate);

            // aggregate successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote aggregate files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created aggregate\n`));
            return 0;
        }
        catch (e) {
            // failed to create the aggregate.
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create aggregate files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}