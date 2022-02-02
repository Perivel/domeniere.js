import { Path } from "@swindle/filesystem";
import { ArtifactDetails } from "../artifact-details/artifact-details";

/**
 * ArtifactDetailsParser.
 * 
 * Parses artifact details from a path.
 */

export class ArtifactDetailsParser {

    // The valid input format: module/artifact/path/if/they/choose/to/artifact-name
    private static INPUT_VALIDATOR = /^([A-Za-z0-9\-]+)([\\\/][A-Za-z0-9\-]+)+$/;

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

    public parse(str: string): ArtifactDetails {
        
        // make sure the 
        if (ArtifactDetailsParser.INPUT_VALIDATOR.test(str)) {
            const path = new Path(str);
            const segments = path.segments();

            const module = segments[0];
            const segCount = segments.length;
            const nestLevel = segCount - 1;
            const artifactName = segments[segCount - 1];
            const artifactPath = segCount > 2 ? segments.reduce((previous, current, currentIndex) => {
                if ((currentIndex > 1) && (currentIndex < segCount - 1)) {
                    // append the current value to the previous value with the separator.
                    return previous.concat(Path.Separator(), current);
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

            return new ArtifactDetails(module, artifactPath, artifactName, nestLevel);
        }
        else {
            // invalid input.
            throw new Error(`Invalid format: ${str}`);
        }
    }
}