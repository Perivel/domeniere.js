import { Command } from '@domeniere/service';
import { Conversation, ConversationsRepository, Message } from '../../chatroom.module';
export declare class PostMessageCommand extends Command {
    private conversationRepository;
    constructor(repository: ConversationsRepository);
    execute(message: Message, conversation: Conversation): Promise<void>;
}
//# sourceMappingURL=post-message.command.d.ts.map