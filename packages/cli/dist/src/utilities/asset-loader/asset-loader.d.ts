import { AssetLoaderInterface } from "./asset-loader.interface";
/**
 * AssetLoader
 *
 * A utility class to load assets.
 */
export declare class AssetLoader implements AssetLoaderInterface {
    private static LOGO_ART_PATH;
    private logoArt;
    constructor();
    /**
     * loads the logo art.
     */
    loadLogoArt(): Promise<string>;
}
//# sourceMappingURL=asset-loader.d.ts.map