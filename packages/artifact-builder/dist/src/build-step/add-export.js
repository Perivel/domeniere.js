"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExports = void 0;
const filesystem_1 = require("@swindle/filesystem");
const build_step_1 = require("./build-step");
/**
 * AddExports
 *
 * Modifies the module file to include the exports.
 */
class AddExports extends build_step_1.BuildStep {
    constructor(modulePath, content) {
        super();
        this.modulePath = modulePath;
        this.contents = content;
    }
    /**
     * execute()
     *
     * executes the step.
     */
    async execute() {
        let file = null;
        try {
            file = await filesystem_1.FileSystem.Open(this.modulePath, filesystem_1.FileOpenFlag.READ_APPEND, filesystem_1.FileOpenMode.APPEND);
            const fileContents = await file.readAll();
            if (!fileContents.includes(this.contents)) {
                await file.append(this.contents);
            }
        }
        catch (e) {
            throw e;
        }
        finally {
            if (file) {
                await file.close();
            }
        }
    }
    /**
     * undo()
     *
     * undoes the step.
     */
    async undo() {
        //
    }
}
exports.AddExports = AddExports;
//# sourceMappingURL=add-export.js.map