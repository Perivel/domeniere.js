"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaffoldProjectCommand = void 0;
const cliconfig_json_1 = __importDefault(require("./../../../cliconfig.json"));
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const enquirer_1 = require("enquirer");
const artifact_builder_1 = require("@domeniere/artifact-builder");
const core_1 = require("@swindle/core");
const filesystem_1 = require("@swindle/filesystem");
const os_1 = require("@swindle/os");
const utilities_well_1 = require("./../../utilities/utilities.well");
/**
 * ScaffoldProjectCommand
 *
 * Scaffolds a new Domeniere project
 */
class ScaffoldProjectCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        this.domainName = clipanion_1.Option.String({ required: false, name: "domain-name", validator: t.isString() });
    }
    /**
     * execute()
     *
     * executes the operation.
     * @returns 0 if successful. non-zero if an error occured.
     */
    async execute() {
        // make sure the project directory is not already in use.
        const stringFormatter = new core_1.StringFormatter();
        const messageFormatter = new utilities_well_1.MessageFormatter();
        const spinner = new utilities_well_1.Spinner();
        const assets = new utilities_well_1.AssetLoader();
        const cwd = os_1.Process.Cwd();
        // show logo art.
        this.context.stdout.write(`${await assets.loadLogoArt()}\n\n`);
        // Prompt for the requirements.
        let inputData = null;
        try {
            inputData = await (0, enquirer_1.prompt)([
                {
                    type: 'input',
                    name: 'projectName',
                    message: "Project Name",
                    initial: stringFormatter.paramCase(this.domainName),
                    validate(value) {
                        return value.trim().length > 0;
                    }
                },
                {
                    type: 'input',
                    name: 'description',
                    message: "Description",
                    initial: cliconfig_json_1.default.defaults.description,
                },
                {
                    type: 'select',
                    name: 'packageManager',
                    message: "Choose a package manager",
                    choices: [
                        {
                            name: 'npm',
                            value: artifact_builder_1.PackageManager.NPM.toString()
                        },
                        {
                            name: 'yarn',
                            value: artifact_builder_1.PackageManager.YARN.toString()
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
                    validate(value) {
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
                    initial: cliconfig_json_1.default.defaults.license
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
        const packageManager = inputData.packageManager == artifact_builder_1.PackageManager.NPM.toString() ? artifact_builder_1.PackageManager.NPM : artifact_builder_1.PackageManager.YARN;
        const projectName = stringFormatter.paramCase(inputData.projectName);
        const projectPath = filesystem_1.Path.FromSegments(cwd, projectName);
        // build the project files.
        try {
            spinner.start(messageFormatter.info("Creating project files..."));
            const artifact = new artifact_builder_1.ProjectArtifact(inputData.projectName, inputData.description, inputData.author, inputData.repository.length > 0 ? new URL(inputData.repository) : null, inputData.license, packageManager, cwd);
            const builder = new artifact_builder_1.ArtifactBuilder();
            await builder.build(artifact);
            spinner.stopWithSuccess(messageFormatter.info("Successfuly created project files."));
        }
        catch (e) {
            // failed to build the project.
            // show the error message.
            spinner.stopWithFailure(messageFormatter.error("Could not create project files."));
            const errMsg = e.message;
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
exports.ScaffoldProjectCommand = ScaffoldProjectCommand;
ScaffoldProjectCommand.paths = [
    ["new"],
];
// This information is shown on the help command.
ScaffoldProjectCommand.usage = {
    //category: 'Domains',
    description: "Creates a Domeniere project.",
    details: "Creates a new Domeniere project.",
};
/**
 * The dependencies for a Domeniere application.
 */
ScaffoldProjectCommand.PROJECT_DEPENDENCIES = [
    "@swindle/core",
    "@swindle/structs",
    "@swindle/specification",
    "@domeniere/core",
    "@domeniere/common"
];
