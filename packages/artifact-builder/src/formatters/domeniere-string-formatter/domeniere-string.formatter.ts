import { StringFormatter } from "@swindle/core";
import { DomeniereStringFormatterInterface } from "./domenire-string-formatter.interface";

/**
 * DomeniereStringFormatter.
 * 
 * An extended StringFormatter for methods specific to Domeniere convensions.
 */

export class DomeniereStringFormatter extends StringFormatter implements DomeniereStringFormatterInterface {

    constructor() {
        super();
    }

    /**
     * classNameCase()
     * 
     * converts an input to a format suitable to used as a class name.
     * @param dirty the input to convert.
     */

    public classNameCase(dirty: any): string {
        return this.capitalCase(dirty).replace(/\s+/g, '');
    }

    /**
     * domainNameCase()
     *
     * converts an input to a format suitable to be used as a domain name 
     * in a domconfig file.
     * @param dirty the input to convert.
     */

    public domainNameCase(dirty: any): string {
        return this.paramCase(dirty);
    }

    /**
     * fileNameCase()
     *
     * converts an input to a format suitable to used as a file name.
     * @param dirty the input to convert.
     */

    public fileNameCase(dirty: any): string {
        return this.paramCase(dirty);
    }
}