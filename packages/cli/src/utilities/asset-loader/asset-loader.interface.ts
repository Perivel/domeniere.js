

export interface AssetLoaderInterface {
    
    /**
     * loads the logo art.
     */

    loadLogoArt(): Promise<string>;
}