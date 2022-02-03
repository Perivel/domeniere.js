"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactDetailsParser = void 0;
const filesystem_1 = require("@swindle/filesystem");
const artifact_details_1 = require("../artifact-details/artifact-details");
/**
 * ArtifactDetailsParser.
 *
 * Parses artifact details from a path.
 */
class ArtifactDetailsParser {
    constructor() {
        //
    }
    /**
     * parse()
     *
     * parses the input string.
     * @param str the string to parse.
     * @returns the ArtifactDetails.
     * @throws an error if the format of the input is invalid.
     */
    parse(str) {
        // make sure the 
        if (ArtifactDetailsParser.INPUT_VALIDATOR.test(str)) {
            const path = new filesystem_1.Path(str);
            const segments = path.segments();
            const module = segments[0];
            const segCount = segments.length;
            const nestLevel = segCount - 1;
            const artifactName = segments[segCount - 1];
            const artifactPath = segCount > 2 ? segments.reduce((previous, current, currentIndex) => {
                if ((currentIndex > 1) && (currentIndex < segCount - 1)) {
                    // append the current value to the previous value with the separator.
                    return previous.concat(filesystem_1.Path.Separator(), current);
                }
                else if (currentIndex == 1) {
                    // this is the beginning of the path.
                    return previous + current;
                }
                else {
                    // do not include. It is either the module name or the artifact name.
                    return previous;
                }
            }, "") : "";
            return new artifact_details_1.ArtifactDetails(module, artifactPath, artifactName, nestLevel);
        }
        else {
            // invalid input.
            throw new Error(`Invalid format: ${str}`);
        }
    }
}
exports.ArtifactDetailsParser = ArtifactDetailsParser;
// The valid input format: module/artifact/path/if/they/choose/to/artifact-name
ArtifactDetailsParser.INPUT_VALIDATOR = /^([A-Za-z0-9\-]+)([\\\/][A-Za-z0-9\-]+)+$/;
//# sourceMappingURL=artifact-details-parser.js.map