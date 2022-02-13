#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("@swindle/os");
const clipanion_1 = require("clipanion");
const config = __importStar(require("./cliconfig.json"));
const package_json_1 = require("./package.json");
const command_list_1 = require("./src/commands/command-list");
const [node, app, ...args] = os_1.Process.argv;
const cli = new clipanion_1.Cli({
    binaryLabel: config.name,
    binaryName: config.binary_name,
    binaryVersion: package_json_1.version,
});
// register all commands
command_list_1.commands.forEach(cmd => cli.register(cmd));
// run the cli
cli.runExit(args, clipanion_1.Cli.defaultContext);
