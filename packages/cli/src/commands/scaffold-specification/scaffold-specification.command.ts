import { Command, Option } from "clipanion";
import * as t from "typanion";
import { ArtifactBuilder, DomeniereStringFormatter, SpecificationArtifact } from "@domeniere/artifact-builder";
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";
import { Process } from "@swindle/os";


/**
 * ScaffoldSpecificationCommand
 * 
 * Scaffolds a Specification in the project.
 */


export class ScaffoldSpecificationCommand extends Command {

    // paths
    static paths = [
        ["create", "specification"]
    ];

    // parameters
    specificationPath = Option.String({ required: true, name: 'specification-path', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates a Specification in the specified module.",
        details: `Creates a Specification in the specified module.`,
        // This section is causing an error.
        // examples: [
        //     [
        //         'Creates a "Registration" specification in the "Users" module.',
        //         'domeniere create specification users/Registration'
        //     ],
        //     [
        //         'Creates a "EditProfile" Specification inside the profile/ subdirectory of the "Users" module.',
        //         "domeniere create specification users/profile/EditProfile"
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
            // create the specification.
            this.context.stdout.write(messageFormatter.info(`Creating specification\n`))
            spinner.start(messageFormatter.info("Writing specification files..."));
            const moduleTemplate = new SpecificationArtifact(
                this.specificationPath,
                cwd
            );
            await builder.build(moduleTemplate);

            // specification successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote specification files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created specification\n`));
            return 0;
        }
        catch (e) {
            // failed to create the specification
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create specification files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}