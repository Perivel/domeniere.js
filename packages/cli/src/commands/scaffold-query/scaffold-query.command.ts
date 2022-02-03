import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, QueryArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldQueryCommand
 * 
 * Scaffolds a Query in the project.
 */


export class ScaffoldQueryCommand extends Command {

    // paths
    static paths = [
        ["create", "query"]
    ];

    // parameters
    queryPath = Option.String({ required: true, name: 'query-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
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
            // create the query.
            this.context.stdout.write(messageFormatter.info(`Creating query\n`))
            spinner.start(messageFormatter.info("Writing query files..."));
            const moduleTemplate = new QueryArtifact(
                this.queryPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // query successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote query files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created Query\n`));
            return 0;
        }
        catch (e) {
            // failed to create the query
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create query files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}