import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, DtoArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldDtoCommand
 * 
 * Scaffolds a Dto in the project.
 */


export class ScaffoldDtoCommand extends Command {

    // paths
    static paths = [
        ["create", "dto"]
    ];

    // parameters
    dtoPath = Option.String({ required: true, name: 'dto-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates a Dto in the specified module.",
        details: `Creates a Dto in the specified module.`,
        // This section is causing an error.
        // examples: [
        //     [
        //         'Creates a "User" Dto in the "Users" module.',
        //         'domeniere create dto users/User'
        //     ],
        //     [
        //         'Creates a "AccountProfile" Dto inside the accounts/ subdirectory of the "Users" module.',
        //         "domeniere create dto users/accounts/AccountProfile"
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
            // create the dto.
            this.context.stdout.write(messageFormatter.info(`Creating dto\n`))
            spinner.start(messageFormatter.info("Writing dto files..."));
            const moduleTemplate = new DtoArtifact(
                this.dtoPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // dto successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote dto files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created dto\n`));
            return 0;
        }
        catch (e) {
            // failed to create the dto
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create dto files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}