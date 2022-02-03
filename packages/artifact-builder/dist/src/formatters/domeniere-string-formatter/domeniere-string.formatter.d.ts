import { StringFormatter } from "@swindle/core";
import { DomeniereStringFormatterInterface } from "./domenire-string-formatter.interface";
/**
 * DomeniereStringFormatter.
 *
 * An extended StringFormatter for methods specific to Domeniere convensions.
 */
export declare class DomeniereStringFormatter extends StringFormatter implements DomeniereStringFormatterInterface {
    constructor();
    /**
     * classNameCase()
     *
     * converts an input to a format suitable to used as a class name.
     * @param dirty the input to convert.
     */
    classNameCase(dirty: any): string;
    /**
     * domainNameCase()
     *
     * converts an input to a format suitable to be used as a domain name
     * in a domconfig file.
     * @param dirty the input to convert.
     */
    domainNameCase(dirty: any): string;
    /**
     * fileNameCase()
     *
     * converts an input to a format suitable to used as a file name.
     * @param dirty the input to convert.
     */
    fileNameCase(dirty: any): string;
}
//# sourceMappingURL=domeniere-string.formatter.d.ts.map