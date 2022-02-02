"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetLoader = void 0;
const filesystem_1 = require("@swindle/filesystem");
/**
 * AssetLoader
 *
 * A utility class to load assets.
 */
class AssetLoader {
    constructor() {
        this.logoArt = "";
    }
    /**
     * loads the logo art.
     */
    async loadLogoArt() {
        if (!this.logoArt) {
            const file = await filesystem_1.FileSystem.Open(AssetLoader.LOGO_ART_PATH, filesystem_1.FileOpenFlag.READ, filesystem_1.FileOpenMode.READONLY);
            this.logoArt = await file.readAll();
            await file.close();
        }
        return this.logoArt;
    }
}
exports.AssetLoader = AssetLoader;
// The path to the logo art.
AssetLoader.LOGO_ART_PATH = filesystem_1.Path.FromSegments(__dirname, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, `..${filesystem_1.Path.Separator()}`, "assets", "logo.art");
