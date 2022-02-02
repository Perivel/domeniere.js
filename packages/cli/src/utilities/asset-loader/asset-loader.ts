import { FileOpenFlag, FileOpenMode, FileSystem, Path } from "@swindle/filesystem";
import { AssetLoaderInterface } from "./asset-loader.interface";

/**
 * AssetLoader
 * 
 * A utility class to load assets.
 */

export class AssetLoader implements AssetLoaderInterface {

    // The path to the logo art.
    private static LOGO_ART_PATH = Path.FromSegments(__dirname, `..${Path.Separator()}`, `..${Path.Separator()}`, `..${Path.Separator()}`, "assets", "logo.art");

    private logoArt: string;

    constructor() {
        this.logoArt = "";
    }

    /**
     * loads the logo art.
     */

    public async loadLogoArt(): Promise<string> {
        if (!this.logoArt) {
            const file = await FileSystem.Open(AssetLoader.LOGO_ART_PATH, FileOpenFlag.READ, FileOpenMode.READONLY);
            this.logoArt = await file.readAll();
            await file.close();
        }

        return this.logoArt;
    }
}