
/**
 * CoordinatesInterface
 * 
 * Specifies the requirements to represent geographic coordinates.
 */

export interface CoordinatesInterface {

    /**
     * latitude()
     * 
     * latitude() gets the latitude.
     */

    latitude(): number;

    /**
     * longitude()
     * 
     * longitude() gets teh longitude.
     */

    longitude(): number;
}