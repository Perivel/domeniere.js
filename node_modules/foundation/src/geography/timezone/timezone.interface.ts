export interface TimezoneInterface {

    /**
     * TimezoneInterface
     */

    abbreviation(): string;

    /**
     * id()
     * 
     * id() gets the timezone id.
     */

    id(): string;

    /**
     * utcOffset()
     * 
     * utcOffset() gets the UTC offset. 
     */

    utcOffset(): number;
}