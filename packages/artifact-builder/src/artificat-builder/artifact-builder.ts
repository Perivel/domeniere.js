import {
    Stack,
    Queue,
} from "@swindle/structs";
import { Artifact } from "../artifact/artifact";
import { AddExports } from "../build-step/add-export";
import { BuuildDirectory } from "../build-step/build-directory";
import { BuuildFile } from "../build-step/build-file";
import { BuildStep } from "../build-step/build-step";
import { ArtifactBuilderInterface } from "./artifact-builder.interface";

/**
 * ArtifactBuilder
 * 
 * A Utility class to build artifacts.
 */

export class ArtifactBuilder implements ArtifactBuilderInterface {

    private readonly buildSteps: Queue<BuildStep>;
    private readonly completedSteps: Stack<BuildStep>;

    constructor() {
        this.buildSteps = new Queue<BuildStep>();
        this.completedSteps = new Stack<BuildStep>();
    }

    /**
     * build()
     * 
     * builds the artifact.
     */

    public async build(artifact: Artifact): Promise<void> {

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
        catch(e) {
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

    private async executeBuildSteps(steps: Queue<BuildStep>): Promise<void> {
        if (!steps.isEmpty()) {
            const step = steps.dequeue()!;
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

    private async prepareSteps(artifact: Artifact): Promise<void> {
        const directories = artifact.directoriesInfo();
        const files = await artifact.filesInfo();
        const exports = await artifact.exportsInfo();
        
        // prepare the directories.
        directories.forEach( directory => {
            this.buildSteps.enqueue(new BuuildDirectory(directory));
        });

        // prepare the files.
        files.forEach( (content, path) => {
            this.buildSteps.enqueue(new BuuildFile(path, content));
        });

        // prepare the exports
        exports.forEach((content, path) => {
            this.buildSteps.enqueue(new AddExports(path, content));
        });
    }

    /**
     * undoBuildSteps()
     * 
     * undoes the build steps that have already been executed.
     * @param steps the steps to execute.
     */

    private async undoBuildSteps(steps: Stack<BuildStep>): Promise<void> {
        if (!steps.isEmpty()) {
            const step = steps.pop()!;
            await step.undo();
            await this.undoBuildSteps(steps);
        }
        else {
            return;
        }
    }
}