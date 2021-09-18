import { Command } from '@domeniere/service';
import { Conversation, ConversationJoined, ConversationsRepository, User } from '../../chatroom.module';


export class JoinConversationCommand extends Command {

    private readonly conversationRepository: ConversationsRepository;

    constructor(conversationRepository: ConversationsRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }

    public async execute(user: User, conversation: Conversation): Promise<void> {
        conversation.addMember(user.id());

        try {
            await this.conversationRepository.save(conversation);
            conversation.confirmStateChanges();
            await this.emit(new ConversationJoined(user, conversation));
        }
        catch(e) {
            conversation.rollbackStateChanges();
            throw e;
        }
    }
}