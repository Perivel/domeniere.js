"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filesystem_1 = require("@swindle/filesystem");
const os_1 = require("@swindle/os");
const core_1 = require("@swindle/core");
/**
 * This script builds all the components of the Domeniere framework
 */
// This is the base path of the packages directory.
const packagesPath = filesystem_1.Path.FromSegments(__dirname, "../packages");
// The build function.
const build = async () => {
    const startTime = core_1.DateTime.Now();
    // run build scripts
    console.log("Building Domeniere Framework");
    // build the state module
    console.log("\tBuilding State module");
    let moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'state');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build the values module.
    console.log("\tBuilding Value module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'value');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build the entity module
    console.log("\tBuilding Entity module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'entity');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build the aggregate module
    console.log("\tBuilding Aggregate module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'aggregate');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build factory module
    console.log("\tBuilding Factory module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'factory');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build the repository module
    console.log("\tBuilding Repository module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'repository');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build the event module
    console.log("\tBuilding Event module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'event');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build domain module
    console.log("\tBuilding Domain module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'domain');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build dto module
    console.log("\tBuilding Dto module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'dto');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build service module
    console.log("\tBuilding Service module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'service');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build core module
    console.log("\tBuilding Core module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'core');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    // build common module
    console.log("\tBuilding Common module");
    moduleDir = filesystem_1.Path.FromSegments(packagesPath, 'common');
    await os_1.Process.Exec('yarn build', {
        cwd: moduleDir.toString()
    });
    return core_1.Duration.FromDateTimeDifference(core_1.DateTime.Now(), startTime);
};
build()
    .then(duration => console.log(`Finished in ${duration.inSeconds()} seconds.`))
    .catch(e => {
    console.log(`Error: ${e.message}`);
    throw e;
});
//# sourceMappingURL=build-framework.js.map