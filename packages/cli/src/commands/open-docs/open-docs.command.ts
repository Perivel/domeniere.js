import { DomeniereStringFormatter } from "@domeniere/artifact-builder";
import { Command, Option } from "clipanion";
import * as t from 'typanion';
import open from 'open';
import { MessageFormatter, Spinner } from "../../utilities/utilities.well";


/**
 * OpenDocsCommand
 * 
 * Opens the Documentations page.
 */


export class OpenDocsCommand extends Command {

    // paths
    static paths = [
        ["docs"]
    ];

    // parameters
    sectionName = Option.String({ required: false, name: 'section-name', validator: t.isString() });

    // This information is shown on the help command.
    static usage = {
        category: 'Documentation',
        description: "Opens the documentations page in the default browser.",
        details: `Opens the Domeniere Documentations web page on the specified section, or the homepage if the section is omitted,`,
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

    // List of possible pages
    private readonly pages = new Map<string, URL>([
        ['home', new URL(`https://www.domeniere.com/docs/`)],

        // aggregates
        ['aggregate', new URL(`https://www.domeniere.com/docs/v2/aggregates.html`)],

        // Apis
        ['api', new URL(`https://www.domeniere.com/docs/v2/api.html`)],

        // dtos
        ['dto', new URL(`https://www.domeniere.com/docs/v2/dtos.html`)],

        // entities
        ['entity', new URL(`https://www.domeniere.com/docs/v2/entities.html`)],

        // events
        ['event', new URL(`https://www.domeniere.com/docs/v2/events.html`)],

        // factories
        ['factory', new URL(`https://www.domeniere.com/docs/v2/factories.html`)],

        // modules
        ['module', new URL(`https://www.domeniere.com/docs/v2/modules.html`)],

        // repositories
        ['repository', new URL(`https://www.domeniere.com/docs/v2/repositories.html`)],

        // services
        ['service', new URL(`https://www.domeniere.com/docs/v2/services.html`)],
        ['command', new URL(`https://www.domeniere.com/docs/v2/services.html#commands`)],
        ['query', new URL(`https://www.domeniere.com/docs/v2/services.html#queries`)],

        // specifications
        ['specification', new URL(`https://www.domeniere.com/docs/v2/specifications.html`)],

        // values
        ['value', new URL(`https://www.domeniere.com/docs/v2/values.html`)],
    ]);

    /**
     * execute()
     * 
     * Executes the command.
     */

    async execute(): Promise<number> {

        // create the module.
        const spinner = new Spinner();
        const messageFormatter = new MessageFormatter();
        const section = this.sectionName ? this.sectionName!.toLocaleLowerCase() : "";

        try {
            spinner.start(messageFormatter.info("Opening Documentation in default browser..."));
            let url = '';

            if (this.pages.has(section)) {
                url = this.pages.get(section)!.toString();
            }
            else {
                url = this.pages.get('home')!.toString();
            }

            // open the URL.
            await open(url);

            spinner.stopWithSuccess(messageFormatter.info("Successfully opened Documentation."));
            return 0;
        }
        catch(e) {
            spinner.stopWithFailure((e as Error).message);
            return 1;
        }
    }
}