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
exports.OpenDocsCommand = void 0;
const clipanion_1 = require("clipanion");
const t = __importStar(require("typanion"));
const open_1 = __importDefault(require("open"));
const utilities_well_1 = require("../../utilities/utilities.well");
/**
 * OpenDocsCommand
 *
 * Opens the Documentations page.
 */
class OpenDocsCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        // parameters
        this.sectionName = clipanion_1.Option.String({ required: false, name: 'section-name', validator: t.isString() });
        // List of possible pages
        this.pages = new Map([
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
    }
    /**
     * execute()
     *
     * Executes the command.
     */
    async execute() {
        // create the module.
        const spinner = new utilities_well_1.Spinner();
        const messageFormatter = new utilities_well_1.MessageFormatter();
        const section = this.sectionName ? this.sectionName.toLocaleLowerCase() : "";
        try {
            spinner.start(messageFormatter.info("Opening Documentation in default browser..."));
            let url = '';
            if (this.pages.has(section)) {
                url = this.pages.get(section).toString();
            }
            else {
                url = this.pages.get('home').toString();
            }
            // open the URL.
            await (0, open_1.default)(url);
            spinner.stopWithSuccess(messageFormatter.info("Successfully opened Documentation."));
            return 0;
        }
        catch (e) {
            spinner.stopWithFailure(e.message);
            return 1;
        }
    }
}
exports.OpenDocsCommand = OpenDocsCommand;
// paths
OpenDocsCommand.paths = [
    ["docs"]
];
// This information is shown on the help command.
OpenDocsCommand.usage = {
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
