import config from "./../../../cliconfig.json";
import { 
    Command,
    Option
} from "clipanion";
import * as t from 'typanion';
import { prompt } from "enquirer";
import { 
    ArtifactBuilder, 
    PackageManager, 
    ProjectArtifact 
} from "@domeniere/artifact-builder";
import { StringFormatter } from "@swindle/core";
import { 
    FileSystem, 
    Path
} from "@swindle/filesystem";
import { Process } from "@swindle/os";
import { ScaffoldProjectPromptResponse } from "./scaffold-project-prompt-response.interface";
import { 
    MessageFormatter,
    Spinner,
    AssetLoader
} from "./../../utilities/utilities.well";

/**
 * ScaffoldProjectCommand
 * 
 * Scaffolds a new Domeniere project
 */

export class ScaffoldProjectCommand extends Command {

    static paths = [
        ["new"],
    ];

    // This information is shown on the help command.
    static usage = {
        //category: 'Domains',
        description: "Creates a Domeniere project.",
        details: "Creates a new Domeniere project.",
    };

    /**
     * The dependencies for a Domeniere application.
     */

    private static PROJECT_DEPENDENCIES = [
        "@swindle/core",
        "@swindle/structs",
        "@swindle/specification",
        "@domeniere/core",
        "@domeniere/common"
    ];

    domainName = Option.String({ required: false, name: "domain-name", validator: t.isString() });

    /**
     * execute()
     * 
     * executes the operation.
     * @returns 0 if successful. non-zero if an error occured.
     */

    public async execute(): Promise<number> {
        // make sure the project directory is not already in use.
        const stringFormatter = new StringFormatter();
        const messageFormatter = new MessageFormatter();
        const spinner = new Spinner();
        const assets = new AssetLoader();
        const cwd = Process.Cwd();

        // show logo art.
        this.context.stdout.write(`${await assets.loadLogoArt()}\n\n`);

        // Prompt for the requirements.
        let inputData: ScaffoldProjectPromptResponse | null = null;

        try {
            inputData = await prompt<ScaffoldProjectPromptResponse>([
                {
                    type: 'input',
                    name: 'projectName',
                    message: "Project Name",
                    initial: stringFormatter.paramCase(this.domainName),
                    validate(value: string): boolean {
                        return value.trim().length > 0;
                    }
                },
                {
                    type: 'input',
                    name: 'description',
                    message: "Description",
                    initial: config.defaults.description,
                },
                {
                    type: 'select',
                    name: 'packageManager',
                    message: "Choose a package manager",
                    choices: [
                        {
                            name: 'npm',
                            value: PackageManager.NPM.toString()
                        },
                        {
                            name: 'yarn',
                            value: PackageManager.YARN.toString()
                        }
                    ],
                    maxChoices: 1
                },
                {
                    type: 'input',
                    name: 'author',
                    message: 'Author',
                    initial: '',
                },
                {
                    type: 'input',
                    name: 'repository',
                    message: 'Repository URL',
                    initial: '',
                    validate(value: string): boolean {
                        const validUrlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

                        let res = true;
                        if (value) {
                            res = validUrlPattern.test(value);
                        }

                        return res;
                    }
                },
                {
                    type: 'input',
                    name: 'license',
                    message: 'License',
                    initial: config.defaults.license
                }
            ]);
        }
        catch (e) {
            // prompt failed
            this.context.stdout.write(messageFormatter.error("Something went wrong.\n"));
            return 1;
        }

        // create the project
        this.context.stdout.write(messageFormatter.info("\nCreating Project.\n"));
        const packageManager = inputData.packageManager == PackageManager.NPM.toString() ? PackageManager.NPM : PackageManager.YARN;
        const projectName = stringFormatter.paramCase(inputData.projectName);
        const projectPath = Path.FromSegments(cwd, projectName);
        
        // build the project files.
        try {
            spinner.start(messageFormatter.info("Creating project files..."));
            const artifact = new ProjectArtifact(
                inputData.projectName, 
                inputData.description, 
                inputData.author, 
                inputData.repository.length > 0 ? new URL(inputData.repository) : null, 
                inputData.license, 
                packageManager, 
                cwd
            );
            const builder = new ArtifactBuilder();
            await builder.build(artifact);
            spinner.stopWithSuccess(messageFormatter.info("Successfuly created project files."))
        }
        catch(e) {
            // failed to build the project.

            // show the error message.
            spinner.stopWithFailure(messageFormatter.error("Could not create project files."));
            const errMsg = (e as Error).message;
            this.context.stdout.write(`\n${messageFormatter.error(errMsg)}`);
            return 1;
        }

        // install the dependencies
        // try {
        //     spinner.start(messageFormatter.info("Installing project dependencies..."));
        //     const packagesToInstall = ScaffoldProjectCommand.PROJECT_DEPENDENCIES.join(" ");
        //     const binary = packageManager.toString();
        //     const args = packageManager === PackageManager.NPM ? `install ${packagesToInstall}` : `add ${packagesToInstall}`;
        //     await Process.Spawn(binary, [args], {
        //         cwd: projectPath.toString(),
        //         shell: true,
        //         encoding: "utf8",
        //     });

        //     // the installation was successful.
        //     spinner.stopWithSuccess(messageFormatter.info("Successfully installed project dependencies.\n"));
        // }
        // catch(e) {
        //     // failed to install dependencies.
        //     // delete the directory.
        //     if (await FileSystem.Contains(projectPath)) {
        //         await FileSystem.Delete(projectPath, true, true);
        //     }
            
        //     // clean up and show the error message.
        //     spinner.stopWithFailure(messageFormatter.error("Failed to install dependencies.\n"));
        //     const errMsg = (e as Error).message;
        //     this.context.stdout.write(messageFormatter.error(`${errMsg}\n`));
        //     return 1;
        // }

        // successfully created project.
        const successMsg = `Successfully created project ${projectName}`;
        this.context.stdout.write(`${messageFormatter.info(successMsg)}\n`);
        return 0;
    }
}