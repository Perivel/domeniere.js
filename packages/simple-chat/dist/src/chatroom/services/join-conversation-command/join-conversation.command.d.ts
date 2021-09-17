import { Command } from '@domeniere/service';
import { Conversation, ConversationsRepository, User } from '../../chatroom.module';
export declare class JoinConversationCommand extends Command {
    private readonly conversationRepository;
    constructor(conversationRepository: ConversationsRepository);
    execute(user: User, conversation: Conversation): Promise<void>;
}
//# sourceMappingURL=join-conversation.command.d.ts.map