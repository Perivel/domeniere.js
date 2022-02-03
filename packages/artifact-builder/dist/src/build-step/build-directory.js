"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuuildDirectory = void 0;
const filesystem_1 = require("@swindle/filesystem");
const build_step_1 = require("./build-step");
/**
 * BuildDirectory
 *
 * Builds a directory.
 */
class BuuildDirectory extends build_step_1.BuildStep {
    constructor(directory) {
        super();
        this.directory = directory;
    }
    /**
     * execute()
     *
     * executes the step.
     */
    async execute() {
        if (!await filesystem_1.FileSystem.Contains(this.directory)) {
            await filesystem_1.FileSystem.CreateDirectory(this.directory);
        }
    }
    /**
     * undo()
     *
     * undoes the step.
     */
    async undo() {
        if (await filesystem_1.FileSystem.Contains(this.directory)) {
            await filesystem_1.FileSystem.Delete(this.directory, true, true);
        }
    }
}
exports.BuuildDirectory = BuuildDirectory;
//# sourceMappingURL=build-directory.js.map