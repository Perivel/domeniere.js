/**
 * CountryInterface
 * 
 * CountryInterface specifies functionalities for a country.
 */

export interface CountryInterface {

    /**
     * code()
     * 
     * code() gets the country code.
     */

    code(): string;

    /**
     * name()
     * 
     * name() gets the country's common name.
     */

    name(): string; 
}