"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactBuilder = void 0;
const structs_1 = require("@swindle/structs");
const add_export_1 = require("../build-step/add-export");
const build_directory_1 = require("../build-step/build-directory");
const build_file_1 = require("../build-step/build-file");
/**
 * ArtifactBuilder
 *
 * A Utility class to build artifacts.
 */
class ArtifactBuilder {
    constructor() {
        this.buildSteps = new structs_1.Queue();
        this.completedSteps = new structs_1.Stack();
    }
    /**
     * build()
     *
     * builds the artifact.
     */
    async build(artifact) {
        // run the vlaidator.
        const error = await artifact.validate();
        if (error !== null) {
            throw new Error(error);
        }
        // create the build queue.
        await this.prepareSteps(artifact);
        // build
        try {
            await this.executeBuildSteps(this.buildSteps);
            this.buildSteps.clear();
            this.completedSteps.clear();
        }
        catch (e) {
            await this.undoBuildSteps(this.completedSteps);
            this.buildSteps.clear();
            this.completedSteps.clear();
            throw e;
        }
    }
    // ==================================
    // helpers
    // ==================================
    /**
     * executBuildSteps()
     *
     * executes the build steps.
     * @param steps the steps to execute.
     *
     */
    async executeBuildSteps(steps) {
        if (!steps.isEmpty()) {
            const step = steps.dequeue();
            this.completedSteps.push(step);
            await step.execute();
            await this.executeBuildSteps(steps);
        }
        else {
            return;
        }
    }
    /**
     * prepareSteps()
     *
     * Prepare the build steps.
     */
    async prepareSteps(artifact) {
        const directories = artifact.directoriesInfo();
        const files = await artifact.filesInfo();
        const exports = await artifact.exportsInfo();
        // prepare the directories.
        directories.forEach(directory => {
            this.buildSteps.enqueue(new build_directory_1.BuuildDirectory(directory));
        });
        // prepare the files.
        files.forEach((content, path) => {
            this.buildSteps.enqueue(new build_file_1.BuuildFile(path, content));
        });
        // prepare the exports
        exports.forEach((content, path) => {
            this.buildSteps.enqueue(new add_export_1.AddExports(path, content));
        });
    }
    /**
     * undoBuildSteps()
     *
     * undoes the build steps that have already been executed.
     * @param steps the steps to execute.
     */
    async undoBuildSteps(steps) {
        if (!steps.isEmpty()) {
            const step = steps.pop();
            await step.undo();
            await this.undoBuildSteps(steps);
        }
        else {
            return;
        }
    }
}
exports.ArtifactBuilder = ArtifactBuilder;
//# sourceMappingURL=artifact-builder.js.map