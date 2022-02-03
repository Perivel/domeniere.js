"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomeniereStringFormatter = void 0;
const core_1 = require("@swindle/core");
/**
 * DomeniereStringFormatter.
 *
 * An extended StringFormatter for methods specific to Domeniere convensions.
 */
class DomeniereStringFormatter extends core_1.StringFormatter {
    constructor() {
        super();
    }
    /**
     * classNameCase()
     *
     * converts an input to a format suitable to used as a class name.
     * @param dirty the input to convert.
     */
    classNameCase(dirty) {
        return this.capitalCase(dirty).replace(/\s+/g, '');
    }
    /**
     * domainNameCase()
     *
     * converts an input to a format suitable to be used as a domain name
     * in a domconfig file.
     * @param dirty the input to convert.
     */
    domainNameCase(dirty) {
        return this.paramCase(dirty);
    }
    /**
     * fileNameCase()
     *
     * converts an input to a format suitable to used as a file name.
     * @param dirty the input to convert.
     */
    fileNameCase(dirty) {
        return this.paramCase(dirty);
    }
}
exports.DomeniereStringFormatter = DomeniereStringFormatter;
//# sourceMappingURL=domeniere-string.formatter.js.map