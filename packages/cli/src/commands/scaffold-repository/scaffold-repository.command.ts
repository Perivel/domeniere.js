import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, RepositoryArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldRepositoryCommand
 * 
 * Scaffolds an repository in the project.
 */


export class ScaffoldRepositoryCommand extends Command {

    // paths
    static paths = [
        ["create", "repository"]
    ];

    // parameters
    repositoryPath = Option.String({ required: true, name: 'repository-path', validator: t.isString() });
    isIdentityGenerating = Option.Boolean("--generates-identity", { required: false, description: "indicates whether the repository should generate identity."})

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates a repository in the specified module.",
        details: `Creates a Repository in the specified module.`,
        // This section is causing an error.
        // examples: [
        //     [
        //         'Creates a "UserRepository" repository in the "Users" module.',
        //         'domeniere create repository users/User'
        //     ],
        //     [
        //         'Creates a "PostRepository" repository inside the posts/ subdirectory of the "Users" module.',
        //         "domeniere create repository users/posts/Post"
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
            this.context.stdout.write(messageFormatter.info(`Creating repository\n`))
            spinner.start(messageFormatter.info("Writing repository files..."));
            const moduleTemplate = new RepositoryArtifact(
                this.repositoryPath,
                cwd,
                this.isIdentityGenerating
            );
            await builder.build(moduleTemplate);

            // repository successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote repository files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created repository\n`));
            return 0;
        }
        catch (e) {
            // failed to create the repository
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create repository files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}