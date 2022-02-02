"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactDetails = void 0;
/**
 * ArtifactDetails
 *
 * The artifact details.
 */
class ArtifactDetails {
    constructor(module, artifactPath, artifactName, nest) {
        this.mod = module;
        this.path = artifactPath;
        this.name = artifactName;
        this.nest = +nest;
    }
    /**
     * artifactPath()
     *
     * gets the artifact path.
     */
    artifactDirPath() {
        return this.path;
    }
    /**
     * artifactName()
     *
     * gets the artifact name.
     */
    artifactName() {
        return this.name;
    }
    /**
     * module()
     *
     * gets the module.
     */
    module() {
        return this.mod;
    }
    /**
     * nestLevel()
     *
     * The nest level is the number of subdirectories from the root directory of the artifact type the artifact is embedded.
     * For example, the nest level of "module/value" = 1. Meanwhile, the nest level of "module/path/to/value" = 3.
     */
    nestLevel() {
        return this.nest;
    }
}
exports.ArtifactDetails = ArtifactDetails;
//# sourceMappingURL=artifact-details.js.map