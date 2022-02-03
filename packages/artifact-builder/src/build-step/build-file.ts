import { Path, FileSystem, FileOpenFlag, FileOpenMode } from "@swindle/filesystem";
import { BuildStep } from "./build-step";

/**
 * BuildFile
 * 
 * Builds a file.
 */

export class BuuildFile extends BuildStep {

    private readonly filePath: Path;
    private readonly contents: string;

    constructor(path: Path, content: string) {
        super();
        this.filePath = path;
        this.contents = content;
    }

    /**
     * execute()
     * 
     * executes the step.
     */

    public async execute(): Promise<void> {
        // create the file.
        if (!await FileSystem.Contains(this.filePath)) {
            await FileSystem.CreateFile(this.filePath, true);
        }
        else {
            // directory already exists.
            throw new Error(`File ${this.filePath.toString()} already exists.`);
        }

        // write the contents.
        const file = await FileSystem.Open(this.filePath, FileOpenFlag.WRITE, FileOpenMode.WRITEONLY);
        await file.writeString(this.contents);
        await file.close();
    }

    /**
     * undo()
     * 
     * undoes the step.
     */

    public async undo(): Promise<void> {
        if (await FileSystem.Contains(this.filePath)) {
            await FileSystem.Delete(this.filePath, true, true);
        }
    }
}