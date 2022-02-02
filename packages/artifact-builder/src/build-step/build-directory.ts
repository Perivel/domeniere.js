import { Path, FileSystem } from "@swindle/filesystem";
import { BuildStep } from "./build-step";

/**
 * BuildDirectory
 * 
 * Builds a directory.
 */

export class BuuildDirectory extends BuildStep {

    private readonly directory: Path;

    constructor(directory: Path) {
        super();
        this.directory = directory;
    }

    /**
     * execute()
     * 
     * executes the step.
     */

    public async execute(): Promise<void> {
        if (!await FileSystem.Contains(this.directory)) {
            await FileSystem.CreateDirectory(this.directory);
        }
    }

    /**
     * undo()
     * 
     * undoes the step.
     */

    public async undo(): Promise<void> {
        if (await FileSystem.Contains(this.directory)) {
            await FileSystem.Delete(this.directory, true, true);
        }
    }
}