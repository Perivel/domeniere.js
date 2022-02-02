import { Command } from "clipanion";
import { AssetLoader } from "../../utilities/utilities.well";

/**
 * DefaultCommand
 * 
 * The CLI default command. This command is just a proxy for the help command.
 */

export class DefaultCommand extends Command {

    static paths = [Command.Default];

    /**
     * execute()
     * 
     * executes the command.
     */

    async execute(): Promise<number> {
        const assets = new AssetLoader();
        this.context.stdout.write(`${await assets.loadLogoArt()}\n`);
        await this.cli.run(['--help']);
        return 0;
    }
}