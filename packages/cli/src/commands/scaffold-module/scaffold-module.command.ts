import { 
    Command, 
    Option 
} from "clipanion";
import * as t from "typanion";
import { Process } from "@swindle/os";
import { 
    ArtifactBuilder,
    DomeniereStringFormatter,
    ModuleArtifact,
} from "@domeniere/artifact-builder";
import {
    Spinner,
    MessageFormatter
} from "./../../utilities/utilities.well";

/**
 * ScaffoldModuleCommand
 * 
 * Scaffolds a module in the project.
 */


export class ScaffoldModuleCommand extends Command {

    // paths
    static paths = [
        ["create", "module"]
    ];

    // parameters
    moduleName = Option.String({ required: true, name: 'module-name', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
        category: 'Modules',
        description: "Creates a Module",
        details: "Creates a module in the current project directory.",
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
        const printableModuleName = stringFormatter.classNameCase(this.moduleName);

        try {
            // create the module.
            this.context.stdout.write(messageFormatter.info(`Creating module ${printableModuleName}\n`))
            spinner.start(messageFormatter.info("Writing module files..."));
            const moduleTemplate = new ModuleArtifact(
                this.moduleName,
                cwd
            );
            await builder.build(moduleTemplate);

            // module successfully created.
            spinner.stopWithSuccess(messageFormatter.info("Successfully wrote module files."));
            this.context.stdout.write(messageFormatter.info(`Successfully created module ${printableModuleName}\n`));
            return 0;
        }
        catch(e) {
            // failed to create the module.
            const errorMessage = (e as Error).message;
            spinner.stopWithFailure(messageFormatter.error("Failed to create module files."));
            this.context.stdout.write(messageFormatter.error(`${errorMessage}\n`));
            return 1;
        }
    }
}