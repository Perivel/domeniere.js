"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCommand = void 0;
const clipanion_1 = require("clipanion");
const utilities_well_1 = require("../../utilities/utilities.well");
/**
 * DefaultCommand
 *
 * The CLI default command. This command is just a proxy for the help command.
 */
class DefaultCommand extends clipanion_1.Command {
    /**
     * execute()
     *
     * executes the command.
     */
    async execute() {
        const assets = new utilities_well_1.AssetLoader();
        this.context.stdout.write(`${await assets.loadLogoArt()}\n`);
        await this.cli.run(['--help']);
        return 0;
    }
}
exports.DefaultCommand = DefaultCommand;
DefaultCommand.paths = [clipanion_1.Command.Default];
