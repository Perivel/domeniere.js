"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const clipanion_1 = require("clipanion");
const scaffold_project_command_1 = require("./scaffold-project/scaffold-project.command");
const default_command_1 = require("./default/default.command");
const scaffold_module_command_1 = require("./scaffold-module/scaffold-module.command");
const scaffold_value_command_1 = require("./scaffold-value/scaffold-value.command");
const scaffold_entity_command_1 = require("./scaffold-entity/scaffold-entity.command");
const scaffold_aggregate_command_1 = require("./scaffold-aggregate/scaffold-aggregate.command");
const scaffold_factory_command_1 = require("./scaffold-factory/scaffold-factory.command");
const scaffold_exception_command_1 = require("./scaffold-exception/scaffold-exception.command");
const scaffold_repository_command_1 = require("./scaffold-repository/scaffold-repository.command");
const scaffold_event_command_1 = require("./scaffold-event/scaffold-event.command");
const scaffold_dto_command_1 = require("./scaffold-dto/scaffold-dto.command");
const scaffold_specification_command_1 = require("./scaffold-specification/scaffold-specification.command");
const scaffold_command_command_1 = require("./scaffold-command/scaffold-command.command");
const scaffold_query_command_1 = require("./scaffold-query/scaffold-query.command");
const open_docs_command_1 = require("./open-docs/open-docs.command");
/**
 * Put all the commands you want included in the CLI here.
 */
exports.commands = [
    default_command_1.DefaultCommand,
    open_docs_command_1.OpenDocsCommand,
    scaffold_aggregate_command_1.ScaffoldAggregateCommand,
    scaffold_command_command_1.ScaffoldCommandCommand,
    scaffold_dto_command_1.ScaffoldDtoCommand,
    scaffold_entity_command_1.ScaffoldEntityCommand,
    scaffold_event_command_1.ScaffoldEventCommand,
    scaffold_exception_command_1.ScaffoldExceptionCommand,
    scaffold_factory_command_1.ScaffoldFactoryCommand,
    scaffold_module_command_1.ScaffoldModuleCommand,
    scaffold_project_command_1.ScaffoldProjectCommand,
    scaffold_query_command_1.ScaffoldQueryCommand,
    scaffold_repository_command_1.ScaffoldRepositoryCommand,
    scaffold_specification_command_1.ScaffoldSpecificationCommand,
    scaffold_value_command_1.ScaffoldValueCommand,
    // built ins
    clipanion_1.Builtins.HelpCommand,
    clipanion_1.Builtins.VersionCommand,
];
