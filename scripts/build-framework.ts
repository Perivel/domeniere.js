import { Path } from "@swindle/filesystem";
import { Process } from "@swindle/os";
import { DateTime, Duration } from '@swindle/core';

/**
 * This script builds all the components of the Domeniere framework
 */

// This is the base path of the packages directory.
const packagesPath = Path.FromSegments(__dirname, "../packages");

// The build function.
const build = async (): Promise<Duration> => {
    const startTime = DateTime.Now();

    // run build scripts
    console.log("Building Domeniere Framework");

    // build the state module
    console.log("\tBuilding State module");
    let moduleDir = Path.FromSegments(packagesPath, 'state');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build the values module.
    console.log("\tBuilding Value module");
    moduleDir = Path.FromSegments(packagesPath, 'value');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build the entity module
    console.log("\tBuilding Entity module");
    moduleDir = Path.FromSegments(packagesPath, 'entity');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build the aggregate module
    console.log("\tBuilding Aggregate module");
    moduleDir = Path.FromSegments(packagesPath, 'aggregate');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build factory module
    console.log("\tBuilding Factory module");
    moduleDir = Path.FromSegments(packagesPath, 'factory');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build the repository module
    console.log("\tBuilding Repository module");
    moduleDir = Path.FromSegments(packagesPath, 'repository');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build the event module
    console.log("\tBuilding Event module");
    moduleDir = Path.FromSegments(packagesPath, 'event');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build domain module
    console.log("\tBuilding Domain module");
    moduleDir = Path.FromSegments(packagesPath, 'domain');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build dto module
    console.log("\tBuilding Dto module");
    moduleDir = Path.FromSegments(packagesPath, 'dto');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build service module
    console.log("\tBuilding Service module");
    moduleDir = Path.FromSegments(packagesPath, 'service');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build core module
    console.log("\tBuilding Core module");
    moduleDir = Path.FromSegments(packagesPath, 'core');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    // build common module
    console.log("\tBuilding Common module");
    moduleDir = Path.FromSegments(packagesPath, 'common');
    await Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    })

    return Duration.FromDateTimeDifference(DateTime.Now(), startTime);
}

build()
    .then(duration => console.log(`Finished in ${duration.inSeconds()} seconds.`))
    .catch(e => {
        console.log(`Error: ${(e as Error).message}`);
        throw e;
    });

