#!/usr/bin/env node
import { Process } from "@swindle/os";
import { Cli, Builtins } from 'clipanion';
import * as config from "./cliconfig.json";
import { commands } from "./src/commands/command-list";

const [node, app, ...args] = Process.argv;

const cli = new Cli({
    binaryLabel: config.name,
    binaryName: config.binary_name,
    binaryVersion: config.version,
});

// register all commands
commands.forEach(cmd => cli.register(cmd));

// run the cli
cli.runExit(args, Cli.defaultContext);