import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, EntityArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldEntityCommand
 * 
 * Scaffolds an entity in the project.
 */


export class ScaffoldEntityCommand extends Command {

    // paths
    static paths = [
        ["create", "entity"]
    ];

    // parameters
    entityPath = Option.String({ required: true, name: 'entity-path', validator: t.isString() });
    timestamped = Option.Boolean('--timestamped', { description: 'Indicates whether the entity will be timestamped', required: false });

    // This information is shown on the help command.
    static usage = {
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
            // create the entity.
            this.context.stdout.write(messageFormatter.info(`Creating entity\n`))
            spinner.start(messageFormatter.info("Writing entity files..."));
            const moduleTemplate = new EntityArtifact(
                this.entityPath,
                cwd,
                this.timestamped,
            );
            await builder.build(moduleTemplate);

            // entity successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote entity files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created entity\n`));
            return 0;
        }
        catch (e) {
            // failed to create the entity.
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create entity files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}