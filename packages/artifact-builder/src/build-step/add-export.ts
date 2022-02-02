import { 
    Path, 
    File,
    FileSystem, 
    FileOpenFlag, 
    FileOpenMode 
} from "@swindle/filesystem";
import { BuildStep } from "./build-step";

/**
 * AddExports
 * 
 * Modifies the module file to include the exports.
 */

export class AddExports extends BuildStep {

    private readonly modulePath: Path;
    private readonly contents: string;

    constructor(modulePath: Path, content: string) {
        super();
        this.modulePath = modulePath;
        this.contents = content;
    }

    /**
     * execute()
     * 
     * executes the step.
     */

    public async execute(): Promise<void> {
        let file: File|null = null;

        try {
            file = await FileSystem.Open(this.modulePath, FileOpenFlag.READ_APPEND, FileOpenMode.APPEND);
            const fileContents = await file.readAll();

            if (!fileContents.includes(this.contents)) {
                await file.append(this.contents);
            }
        }
        catch(e) {
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

    public async undo(): Promise<void> {
        //
    }
}