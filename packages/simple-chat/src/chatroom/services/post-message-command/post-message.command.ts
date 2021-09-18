import { Command } from '@domeniere/service';
import { Conversation, ConversationsRepository, Message, MessagePosted } from '../../chatroom.module';


export class PostMessageCommand extends Command {

    private conversationRepository: ConversationsRepository;

    constructor(repository: ConversationsRepository) {
        super();
        this.conversationRepository = repository;
    }

    public async execute(message: Message, conversation: Conversation): Promise<void> {
        conversation.postMessage(message);

        try {
            await this.conversationRepository.save(conversation);
            conversation.confirmStateChanges();
            await this.emit(new MessagePosted(message, conversation));
        }
        catch(e) {
            conversation.rollbackStateChanges();
            throw e;
        }
    }
}