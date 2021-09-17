import { Command } from '@domeniere/service';
import { User } from '../../aggregates/aggregates.well';
import { ConversationsRepository } from "./../../repositories/repositories.well";
export declare class CreateConversationCommand extends Command {
    private readonly conversationRepository;
    constructor(repository: ConversationsRepository);
    execute(host: User): Promise<void>;
}
//# sourceMappingURL=create-conversation.command.d.ts.map