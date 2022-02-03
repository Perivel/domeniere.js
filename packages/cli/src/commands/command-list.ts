import { 
    BaseContext, 
    Builtins,
    CommandClass 
} from "clipanion";
import { ScaffoldProjectCommand } from "./scaffold-project/scaffold-project.command";
import { DefaultCommand } from "./default/default.command";
import { ScaffoldModuleCommand } from "./scaffold-module/scaffold-module.command";
import { ScaffoldValueCommand } from "./scaffold-value/scaffold-value.command";
import { ScaffoldEntityCommand } from "./scaffold-entity/scaffold-entity.command";
import { ScaffoldAggregateCommand } from "./scaffold-aggregate/scaffold-aggregate.command";
import { ScaffoldFactoryCommand } from "./scaffold-factory/scaffold-factory.command";
import { ScaffoldExceptionCommand } from "./scaffold-exception/scaffold-exception.command";
import { ScaffoldRepositoryCommand } from "./scaffold-repository/scaffold-repository.command";
import { ScaffoldEventCommand } from "./scaffold-event/scaffold-event.command";
import { ScaffoldDtoCommand } from "./scaffold-dto/scaffold-dto.command";
import { ScaffoldSpecificationCommand } from "./scaffold-specification/scaffold-specification.command";
import { ScaffoldCommandCommand } from "./scaffold-command/scaffold-command.command";
import { ScaffoldQueryCommand } from "./scaffold-query/scaffold-query.command";
import { OpenDocsCommand } from "./open-docs/open-docs.command";

/**
 * Put all the commands you want included in the CLI here.
 */

export const commands: CommandClass<BaseContext>[] = [
    DefaultCommand,
    OpenDocsCommand,
    ScaffoldAggregateCommand,
    ScaffoldCommandCommand,
    ScaffoldDtoCommand,
    ScaffoldEntityCommand,
    ScaffoldEventCommand,
    ScaffoldExceptionCommand,
    ScaffoldFactoryCommand,
    ScaffoldModuleCommand,
    ScaffoldProjectCommand,
    ScaffoldQueryCommand,
    ScaffoldRepositoryCommand,
    ScaffoldSpecificationCommand,
    ScaffoldValueCommand,
    // built ins
    Builtins.HelpCommand,
    Builtins.VersionCommand,
]