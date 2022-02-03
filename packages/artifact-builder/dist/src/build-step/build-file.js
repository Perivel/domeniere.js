"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuuildFile = void 0;
const filesystem_1 = require("@swindle/filesystem");
const build_step_1 = require("./build-step");
/**
 * BuildFile
 *
 * Builds a file.
 */
class BuuildFile extends build_step_1.BuildStep {
    constructor(path, content) {
        super();
        this.filePath = path;
        this.contents = content;
    }
    /**
     * execute()
     *
     * executes the step.
     */
    async execute() {
        // create the file.
        if (!await filesystem_1.FileSystem.Contains(this.filePath)) {
            await filesystem_1.FileSystem.CreateFile(this.filePath, true);
        }
        else {
            // directory already exists.
            throw new Error(`File ${this.filePath.toString()} already exists.`);
        }
        // write the contents.
        const file = await filesystem_1.FileSystem.Open(this.filePath, filesystem_1.FileOpenFlag.WRITE, filesystem_1.FileOpenMode.WRITEONLY);
        await file.writeString(this.contents);
        await file.close();
    }
    /**
     * undo()
     *
     * undoes the step.
     */
    async undo() {
        if (await filesystem_1.FileSystem.Contains(this.filePath)) {
            await filesystem_1.FileSystem.Delete(this.filePath, true, true);
        }
    }
}
exports.BuuildFile = BuuildFile;
//# sourceMappingURL=build-file.js.map